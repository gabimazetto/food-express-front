import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import fotoTesteLogo from "../../assets/images/10.png";
import "./DescricaoPedidoCliente.css";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { ContextClient } from "../../contexts/ClientContext";


export function DescricaoPedidoCliente() {
    const [descricaoPedidos, setdescricaoPedidos] = useState([]);
    const { idCli} = useContext(ContextClient);
    const { id } = useParams();
    const frete = 7.50;
    const cupom = 4.50;

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get(`http://localhost:3001/pedidos/cliente/${idCli}/${id}`)
            .then((response) => {
                setdescricaoPedidos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }

    return (
        <div className="container-desc-cliente">
            <section className="section-desc-cliente">
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
                            <Button as={Link} to="/cliente/pedidos/" className="button-desc-cardapio" ><span>Ver cardápio</span></Button>
                        </div>
                        <div className="vertical-row-desc"></div>
                        <div className="desc-item-pedido">
                            <p>Item:</p>
                            <div className="desc-comida-pedido-item mb-3">
                                <p><b>{descricaoPedidos.item?.quantidade}x   {descricaoPedidos.item?.comida?.nome}</b></p>
                                <p><b>R$ {descricaoPedidos.item?.comida.preco}</b></p>


                            </div>

                            <div className="vertical-row-desc"></div>
                            <div className="desc-comida-pedido">
                                <p>Preço:</p>
                                <p>R$ {(descricaoPedidos.item?.quantidade * descricaoPedidos.item?.comida?.preco).toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido">
                                <p>Frete:</p>
                                <p>R$ {frete.toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido">
                                <p>SubTotal:</p>
                                <p>R$ {(frete + (descricaoPedidos.item?.quantidade * descricaoPedidos.item?.comida?.preco)).toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido">
                                <p>Cupom:</p>
                                <p>R$ -{cupom.toFixed(2)}</p>
                            </div>
                            <div className="desc-comida-pedido-total">
                                <p><b>Total:</b></p>
                                <p><b>R$ {((frete + (descricaoPedidos.item?.quantidade * descricaoPedidos.item?.comida?.preco)) - cupom).toFixed(2)}</b></p>
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
                            <h4>Status: </h4>
                            <p>   {descricaoPedidos.status}</p>
                        </div>
                        <div className="vertical-row-desc"></div>

                    </article>
                )}
            </section>
        </div>
    )
}