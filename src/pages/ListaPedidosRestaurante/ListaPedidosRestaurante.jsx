import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";

export function ListaPedidosRestaurante(){

    const [pedidos, setPedidos] = useState(null);
    const { idRes, roleRes } = useContext(ContextRestaurant);
    const { roleCli } = useContext(ContextClient);
    const { token } = useContext(ContextLogin);
    const navigate = useNavigate();
    

useEffect(() => {
    initializeTable();
}, []);

function initializeTable(){
    // Essa rota puxa TODOS os pedidos de do restaurante
axios.get(`http://localhost:3001/pedidos/restaurante/${idRes}`)
    .then((response) =>{
        const listaPedidos = response.data.map((pedido) => {
            const { cliente: { nome, cpf },
                    enderecoPedido: { rua, bairro, numero, cep, complemento },
                    item: { quantidade, comida },
                    restaurante: { nomeFantasia } } = pedido;
            return { ...pedido, cliente: { nome, cpf },
                                enderecoPedido: { rua, bairro, numero, cep, complemento },
                                item: { quantidade, comida },
                                restaurante: { nomeFantasia } };
          });
          setPedidos(listaPedidos);
    })
    .catch((error) =>{
        console.log(error);
    });
}

useEffect(() => {
    if( token && !roleRes && roleCli ){
        navigate('/cliente/home');
    } else if (token && roleRes && !roleCli){
        navigate('/restaurante/home');
    } else if (!token){
        navigate('/');
    }
}, [token, roleCli, roleRes])

return (
    <Container>
        <h1>Pedidos</h1>
        {
            pedidos === null ?
            <Loader/>
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
                            <td>{pedido.item.comida.nome}</td>
                            <td>{pedido.item.quantidade}</td>
                            <td>{pedido.status}</td>
                            <td>{pedido.cliente.nome}</td>
                            <td>{pedido.enderecoPedido?.bairro}</td>
                            <td>{pedido.enderecoPedido?.rua}</td>
                            <td>{pedido.enderecoPedido?.numero}</td>
                            <td>
                                <Button as={Link} to={`/restaurante/pedidos/${pedido.id}`}>
                                    <i className="bi bi-pencil-fill text-light"></i>
                                </Button>
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
