import axios from "axios";
import { CardPedidoCliente } from "../../components/CardPedidoCliente/CardPedidoCliente";
import "./PedidosCliente.css";
import { useContext, useEffect, useState } from "react";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";
import { toast } from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { Container } from "react-bootstrap";



export function PedidosCliente() {
    const [pedidos, setPedidos] = useState([]);
    const { idCli } = useContext(ContextClient);
    const { config } = useContext(ContextLogin);

    useEffect(() => {
        initializeTable();
        const attPagina = setInterval(() => {
            initializeTable();
        }, 5000);


        return () => clearInterval(attPagina)
    }, [idCli]);


    function initializeTable() {
        axios
            .get(`http://localhost:3001/pedidos/cliente/${idCli}`, config)
            .then((response) => {
                setPedidos(response.data);
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }

    return (
        <>
            <Container className="mt-5">
                <main className="main-card-pedido">
                    <section className="section-cards-pedidos">
                        {pedidos === null ? (
                            <Loader />
                        ) : (
                            pedidos.map((pedido) => (
                                <CardPedidoCliente key={pedido.id} pedido={pedido} />
                            ))
                        )}
                    </section>
                </main>
                <div className="d-flex align-items-start justify-content-start ">
                    <ButtonNavigation
                        type="submit"
                        route="/"
                        icon="white bi bi-arrow-left-circle-fill"
                        className="botao-voltar-cardapio d-flex align-items-center justify-content-center"
                        tooltipContent="Voltar para a home"
                    />
                </div>
            </Container>
        </>
    );
}