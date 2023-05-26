import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./CardapioCliente.css"
import { CardCardapioCliente } from "../../components/CardCardapioCliente/CardCardapioCliente";
import { Link, useParams } from "react-router-dom";
import { ContextLogin } from "../../contexts/LoginContext";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";


export function CardapioCliente() {
    const { config } = useContext(ContextLogin);
    const [comidas, setComidas] = useState(null);
    const [pesquisa, setPesquisa] = useState("");
    const [comidasFiltradas, setComidasFiltradas] = useState(comidas);
    const [avaliacao, setAvaliacao] = useState(null);
    const [comentario, setComentario] = useState("");
    const { id } = useParams();
    const [nomeRestaurante, setNomeRestaurante] = useState("");


    // INICIAR TABELA DE CARDÁPIO
    useEffect(() => {
        initializeTable();
    }, []);

    
    function handleUpdateData() {
        initializeTable();
    }


    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable() {
        axios
            .get(`http://localhost:3001/comidas/restaurante/${id}`, config)
            .then((response) => {
                setComidas(response.data);
                setComidasFiltradas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // FUNÇÃO PESQUISAR POR NOME, CATEGORIA, DESCRIÇÃO E CODIGO
    const handlePesquisa = (event) => {
        const pesquisa = event.target.value.toLowerCase();
        const comidasFiltradas = comidas.filter((comida) => {
            return (
                comida.nome.toLowerCase().includes(pesquisa) ||
                comida.codigo.toLowerCase().includes(pesquisa) ||
                comida.categoria.toLowerCase().includes(pesquisa) ||
                comida.descricao.toLowerCase().includes(pesquisa)
            );
        });
        setPesquisa(pesquisa);
        setComidasFiltradas(comidasFiltradas);
    };

    //Jogar depois para a listagem de pedidos

    //   function EnviarAvaliacao() {
    //     axios
    //       .post(`http://localhost:3001/avaliacaos`, {
    //         avaliacao,
    //         comentario,
    //         clienteId,
    //         restauranteId,
    //         pedidoId,
    //       })
    //       .then((response) => {
    //         toast.success(response.data.message, {
    //           position: "bottom-right",
    //           duration: 2000,
    //         });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         toast.error(error.response.data.message, {
    //           position: "bottom-right",
    //           duration: 2000,
    //         });
    //       });

    //     setAvaliacao(null);
    //     setComentario("");

    //     handleClose2();
    //   }

    //   function Estrelas({ maxAvaliacao, rating, RatingChange }) {
    //     const stars = [];
    //     for (let i = 1; i <= maxAvaliacao; i++) {
    //       const filled = i <= rating;
    //       const classeEstrela = filled ? "bi bi-star-fill" : "bi bi-star";

    //       const handleStarClick = () => {
    //         RatingChange(i);
    //       };

    //       stars.push(
    //         <i
    //           className={classeEstrela}
    //           key={i}
    //           onClick={handleStarClick}
    //           style={{ cursor: "pointer" }}
    //         ></i>
    //       );
    //     }
    //     return <div className="rating-stars">{stars}</div>;
    //   }

    return (
        <>
            <Container>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="cardapio-titulo mt-4 mb-4">Cardápio</h1>
                    <Form>
                        <InputGroup className="mb-3 mt-4 ">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar "
                                aria-label="Pesquisar nome ou categoria"
                                aria-describedby="basic-addon2"
                                className="input-cardapio-cliente"
                            />
                        </InputGroup>
                    </Form>
                </div>
                {comidasFiltradas === null ? (
                    <Loader />
                ) : (
                    <CardCardapioCliente
                        comidas={comidasFiltradas}
                        updateData={handleUpdateData}
                    />
                )}
            </div>
            <div className="d-flex align-items-start justify-content-start mt-3 ms-1">
        <ButtonNavigation
          type="submit"
          route="/cliente/listar/restaurantes"
          icon="white bi bi-arrow-left-circle-fill"
          className="botao-voltar-cardapio d-flex align-items-center justify-content-center"
          tooltipContent="Voltar para restaurantes"
        />
      </div>
            </Container>
        </>
    );
}
