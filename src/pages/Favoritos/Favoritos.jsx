import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContextLogin } from "../../contexts/LoginContext";
import "./Favoritos.css";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { ContextClient } from "../../contexts/ClientContext";



export function Favoritos() {

    const [favoritos, setFavoritos] = useState([]);
    const [comidasFavoritas, setComidasFavoritas] = useState([]);
    const { config } = useContext(ContextLogin);
    const { idCli } = useContext(ContextClient)
    
    useEffect(() =>{
        initializeTable();
        initializeComidasTable();
    }, []);


    function initializeTable(){
        axios.get(`http://localhost:3001/favoritos/restaurantes/${idCli}`, config)
        .then((response) =>{
            setFavoritos(response.data);
        }).catch((error) =>{
            console.log(error);
        });
    }

    function initializeComidasTable(){
        axios.get(`http://localhost:3001/favoritos/comidas/${idCli}`, config)
        .then((response) =>{
            setComidasFavoritas(response.data);
        }).catch((error) =>{
            console.log(error);
        });
    }

    return (
        <>
            <Container>
                <section className="container mt-4 mb-4 section-fav">
                    <div className="div-fav">
                        <div className="titulo-fav">
                            <h2>Restaurantes Favoritos</h2>
                        </div>
                        <Row className="row-fav-rest">
                            <div>
                                {
                                    favoritos === null ?
                                        (
                                            <Loader />
                                        ) :
                                        (
                                            <div>
                                                <Col >
                                                    {favoritos.map(favorito => {
                                                        return (
                                                            <Card  className="mb-4 py-4 card-fav-principal">
                                                                <Card.Body className="card-fav">
                                                                    <Card.Title className="fs-3 title-fav">{favorito.restaurante.nomeFantasia}</Card.Title>
                                                                        <Card.Subtitle className="mb-2 text-muted">{favorito.restaurante.razaoSocial}</Card.Subtitle>
                                                                        <Button as={Link} to={`http://localhost:3000/cliente/restaurante/cardapio/${favorito.restauranteId}`}>
                                                                            Ir para Restaurante
                                                                        </Button>
                                                                </Card.Body>
                                                            </Card>
                                                        )
                                                    })}
                                                </Col>
                                            </div>)}
                            </div>
                        </Row>
                    </div>
                    <div className="div-fav">
                        <div className="titulo-fav">
                            <h2>Comidas Favoritas</h2>
                        </div>
                        <Row className="row-fav-comida">
                            {
                                comidasFavoritas === null ?
                                    (<Loader />) : (
                                        <div>
                                            <Col>
                                                {comidasFavoritas.map(comidafavorita => {
                                                    return (
                                                        <Card  className="mb-4 py-4 card-fav-principal">
                                                            <Card.Body className="card-fav">
                                                                <Card.Title className="fs-3 title-fav">{comidafavorita.comida.nome}</Card.Title>
                                                                    <Card.Subtitle className="mb-2 text-muted">Descrição: {comidafavorita.comida.descricao}</Card.Subtitle>
                                                                    <Button as={Link} to={`http://localhost:3000/cliente/restaurante/cardapio/${comidafavorita.comida.restauranteId}`}>
                                                                    Ir para Cardápio
                                                                </Button>
                                                            </Card.Body>
                                                        </Card>
                                                    )
                                                })}
                                            </Col>
                                        </div>
                                    )
                            }
                        </Row>
                    </div>
                </section>
                <div className="d-flex justify-content-start align-items-start mt-3 ms-1">
                    <ButtonNavigation
                        type="submit"
                        route="/cliente/home"
                        icon="white bi bi-arrow-left-circle-fill"
                        className="botao-voltar-favoritos d-flex justify-content-center align-items-center mt-5 mb-5"
                        tooltipContent="Voltar para a home"
                    />
                </div>
            </Container>
        </>
    );
}