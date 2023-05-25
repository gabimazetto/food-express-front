import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import fotoTesteLogo from "../../assets/images/10.png";
import "./DescricaoPedidoCliente.css";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";


export function DescricaoPedidoCliente() {
    const [descricaoPedidos, setdescricaoPedidos] = useState(null);
    const { idCli } = useContext(ContextClient);
    const { config } = useContext(ContextLogin);
    const { id } = useParams();
    const frete = 7.50;
    const cupom = 4.50;

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios
            .get(`http://localhost:3001/pedidos/cliente/${idCli}/${id}`, config)
            .then((response) => {
                const { cliente, enderecoPedido, items, restaurante, ...pedido } = response.data;

                const listaPedidos = {
                    ...pedido,
                    cliente: { nome: cliente.nome, cpf: cliente.cpf },
                    enderecoPedido: { ...enderecoPedido },
                    items: items.map(({ quantidade, comida }) => ({
                        quantidade,
                        comida: {
                            nome: comida.nome,
                            preco: comida.preco
                        },
                    })),
                    restaurante: { nomeFantasia: restaurante.nomeFantasia },
                };

                setdescricaoPedidos(listaPedidos);
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }

    const calcularValorTotalItens = () => {
        if (descricaoPedidos.items) {
            return descricaoPedidos.items
                .map(item => item.quantidade * parseFloat(item.comida?.preco))
                .reduce((a, b) => a + b, 0);
        }
        return 0;
    };

    return (
        <div className="centered-container fluid container-desc-cliente container-edit-cli">
            <section className="section-desc-cliente ">
                {descricaoPedidos === null ? (
                    <Loader />
                ) : (
                    <article className="article-desc-cliente" key={descricaoPedidos.id}>
                        <div>
                            <Button as={Link} to="/cliente/pedidos/" className="button-desc-cliente"> <i class="bi bi-arrow-left"></i> Voltar</Button>
                            <div className="desc-nome-restaurante">
                                <h1>{descricaoPedidos.restaurante?.nomeFantasia}</h1>
                                <img src={fotoTesteLogo} className="desc-foto-pedido" alt="" />
                            </div>
                            <Button as={Link} to={`/cliente/restaurante/cardapio/${descricaoPedidos.restauranteId}`} className="button-desc-cardapio" ><span>Ver cardápio</span></Button>
                        </div>
                        <div className="vertical-row-desc"></div>
                        <div className="desc-item-pedido">
                            <p>Item:</p>
                            {descricaoPedidos.items.map(item => (
                                <div className="desc-comida-pedido-item mb-3" >
                                    <p><b>{item.quantidade}x {item.comida?.nome}</b></p>
                                    <p><b>R$ {item.comida?.preco}</b></p>

                                </div>
                            ))}

                            <div className="vertical-row-desc"></div>
                            <div className="desc-comida-pedido">
                                <p>Preço:</p>
                                <p>R$ {calcularValorTotalItens().toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido">
                                <p>Frete:</p>
                                <p>R$ {frete.toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido">
                                <p>SubTotal:</p>
                                <p>R$ {(frete + calcularValorTotalItens()).toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido">
                                <p>Cupom:</p>
                                <p>R$ -{cupom.toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido-total">
                                <p><b>Total:</b></p>
                                <p><b>R$ {((frete + calcularValorTotalItens()) - cupom).toFixed(2)}</b></p>
                            </div>
                        </div>
                        <div className="vertical-row-desc"></div>
                        <div className="desc-end-pedido">
                            <h3>Endereço:</h3>
                            <p>{descricaoPedidos.enderecoPedido?.rua}, {descricaoPedidos.enderecoPedido?.numero}, compl.: {descricaoPedidos.enderecoPedido?.complemento}, {descricaoPedidos.enderecoPedido?.cep}</p>
                        </div>
                        <div className="vertical-row-desc"></div>
                        <div>
                            <div className="desc-infos-pedido">
                                <h4>Data: </h4>
                                <p>   {descricaoPedidos.dataRegistro}</p>
                            </div>

                            <div className="desc-infos-pedido">
                                <h4>Metodo de pagamento: </h4>
                                <p>   {descricaoPedidos.metodoPagamento}</p>
                            </div>
                        </div>
                        <div className="vertical-row-desc"></div>
                        <div className="desc-infos-pedido">
                            {descricaoPedidos.status === "Pendente" ? (
                                <p>
                                    <b>Status:</b> {descricaoPedidos.status}
                                </p>
                            ) : descricaoPedidos.status === "Aguardando confirmação" ? (
                                <p>
                                    Status: <b className="aguardando">{descricaoPedidos.status}</b>
                                </p>
                            ) : descricaoPedidos.status === "Confirmado" ? (
                                <p>
                                    Status:<b className="confirmado"> {descricaoPedidos.status}</b>
                                </p>
                            ) : descricaoPedidos.status === "A caminho" ? (
                                <p>
                                    Status: <b className="aCaminho">{descricaoPedidos.status}</b>
                                </p>
                            ) : descricaoPedidos.status === "Entregue" ? (
                                <p>
                                    Status: <b className="entregue">{descricaoPedidos.status}</b>
                                </p>
                            ) : descricaoPedidos.status === "Cancelado" ? (
                                <p>
                                    Status: <b className="cancelado">{descricaoPedidos.status}</b>
                                </p>
                            ) : null}
                        </div>
                        <div className="vertical-row-desc"></div>

                    </article>
                )}
            </section>
        </div>
    )
}