import { useEffect, useState } from "react";
import "./CardPedidoCliente.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import fotoTesteLogo from "../../assets/images/10.png"
import { Loader } from "../Loader/Loader";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export function CardPedidoCliente() {
    const [pedidos, setPedidos] = useState([]);
    useEffect(() => {
        initializeTable();
    }, []);


    function initializeTable() {
        axios.get(`http://localhost:3001/pedidos`)
            .then((response) => {
                setPedidos(response.data)
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }

    return (
        <>
            <main className="main-card-pedido">
                <section className="section-cards-pedidos">
                    {pedidos === null ? (
                        <Loader />
                    ) : (
                        pedidos.map((pedido) => {
                            return (
                                <article className="article-cards-pedidos" key={pedido.id}>
                                    <div className="foto-cards-pedidos">
                                        <img src={fotoTesteLogo} className="card-foto-pedido" alt="" />
                                        <h1>{pedido.restaurante.nomeFantasia}</h1>
                                        <Button as={Link} to={`/cliente/pedidos/${pedido.id}`}className="botao-cards-detalhes"><i className="bi bi-arrow-right"></i>
                                        </Button>
                                    </div>
                                    <div className="vertical-row-pedidos"></div>
                                    <div className="items-cards-pedidos">
                                        <div className="mb-2">
                                            <p><b>Data:</b> {pedido.dataRegistro}</p>
                                        </div>
                                        <div className="mb-2">
                                            <p><b>Status:</b> {pedido.status}</p>
                                        </div>
                                        <div className="itens-cards-container">
                                            <p><b>{pedido.item.quantidade}</b>      {pedido.item.comida.nome}</p>
                                        </div>
                                    </div>
                                    <div className="vertical-row-pedidos"></div>
                                    <div className="rest-cards-pedidos">
                                        <div>
                                            <p>Avaliar:</p>
                                            <p>Estrelinha</p>
                                        </div>
                                    </div>
                                    <div className="vertical-row-pedidos"></div>
                                    <div className="refazer-cards-pedidos">
                                        <div>
                                            {/* <Button className="botoes-card-pedidos">Ajuda</Button> */}
                                            <Button className="botoes-card-pedidos" >Refazer pedido</Button>
                                        </div>
                                    </div>
                                </article>
                            )
                        })

                    )}
                </section>
            </main>
        </>
    )
}