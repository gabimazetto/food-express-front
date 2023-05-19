import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { toast } from "react-hot-toast";

export function PedidosRestaurante() {
    const [pedidos, setPedidos] = useState(null);
    const { idRes } = useContext(ContextRestaurant);


    useEffect(() => {
        initializeTable();
        const attPagina = setInterval(() => {
            initializeTable();
        }, 5000);

        return () => clearInterval(attPagina)
    }, [idRes]);

    function initializeTable() {
        // Essa rota puxa TODOS os pedidos de do restaurante
        axios.get(`http://localhost:3001/pedidos/restaurante/${idRes}`)
            .then((response) => {
                const listaPedidos = response.data.map((pedido) => {
                    const { cliente: { nome, cpf },
                        enderecoPedido: { rua, bairro, numero, cep, complemento },
                        item: { quantidade, comida },
                        restaurante: { nomeFantasia } } = pedido;
                    return {
                        ...pedido, cliente: { nome, cpf },
                        enderecoPedido: { rua, bairro, numero, cep, complemento },
                        item: { quantidade, comida },
                        restaurante: { nomeFantasia }
                    };
                });
                setPedidos(listaPedidos);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function updateStatus(pedidoId, status) {
        axios.put(`http://localhost:3001/pedidos/${pedidoId}`, { status: status })
            .then(() => {
                initializeTable();
                toast.success("Pedido atualizado!", {
                    position: "bottom-right",
                    duration: 2000,
                });
            })
            .catch((error) => {
                toast.error("Erro ao atualizar status do pedido.");
            });
    }


    return (
        <Container>
            <h1>Pedidos</h1>
            {
                pedidos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data Pedido</th>
                                <th>Nome Refeição</th>
                                <th>Quantidade</th>
                                <th>Preparação</th>
                                <th>Nome Cliente</th>
                                <th>Bairro</th>
                                <th>Rua</th>
                                <th>Numero</th>
                                <th>Editar Pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map(pedido => {
                                return (
                                    <tr key={pedido.id}>
                                        <td>{pedido.dataRegistro}</td>
                                        <td>{pedido.item.comida?.nome}</td>
                                        <td>{pedido.item.quantidade}</td>
                                        <td>
                                            {pedido.status === "Pendente" ? (
                                                <p><b>Status:</b> {pedido.status}</p>
                                            ) : pedido.status === "Aguardando confirmação" ? (
                                                <p>Status: <b className="aguardando">{pedido.status}</b></p>
                                            ) : pedido.status === "Confirmado" ? (
                                                <p>Status:<b className="confirmado"> {pedido.status}</b></p>
                                            ) : pedido.status === "A caminho" ? (
                                                <p>Status: <b className="aCaminho">{pedido.status}</b></p>
                                            ) : pedido.status === "Entregue" ? (
                                                <p>Status: <b className="entregue">{pedido.status}</b></p>
                                            ) : pedido.status === "Cancelado" ? (
                                                <p>Status: <b className="cancelado">{pedido.status}</b></p>
                                            ) : null}</td>
                                        <td>{pedido.cliente.nome}</td>
                                        <td>{pedido.enderecoPedido?.bairro}</td>
                                        <td>{pedido.enderecoPedido?.rua}</td>
                                        <td>{pedido.enderecoPedido?.numero}</td>
                                        <td>
                                            {pedido.status === "Pendente" ? (
                                                <Button value={"Confirmado"} onClick={() => updateStatus(pedido.id, "Confirmado")} >Confirmado</Button>
                                            ) : (
                                                pedido.status === "Confirmado" ? (
                                                    <Button value={"A caminho"} onClick={() => updateStatus(pedido.id, "A caminho")}>A caminho</Button>
                                                ) : (
                                                    pedido.status === "A caminho" ? <Button value={"Entregue"} onClick={() => updateStatus(pedido.id, "Entregue")}>Entregue</Button> : <Button>Finalizado</Button>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
        </Container>
    )


}