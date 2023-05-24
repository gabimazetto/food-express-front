import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContextLogin } from "../../contexts/LoginContext";
import "./Favoritos.css";



export function Favoritos() {

    const [favoritos, setFavoritos] = useState([]);
    const [comidasFavoritas, setComidasFavoritas] = useState([]);
    const { config } = useContext(ContextLogin);
    
    useEffect(() =>{
        initializeTable();
        initializeComidasTable();
    }, []);


    function initializeTable(){
        axios.get("http://localhost:3001/favoritos/restaurantes", config)
        .then((response) =>{
            setFavoritos(response.data);
        }).catch((error) =>{
            console.log(error);
        });
    }

    function initializeComidasTable(){
        axios.get("http://localhost:3001/favoritos/comidas", config)
        .then((response) =>{
            setComidasFavoritas(response.data);
        }).catch((error) =>{
            console.log(error);
        });
    }

    return(
        <>
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
            ):
            (  
                <div>
                    <Col >
                    {favoritos.map(favorito =>{
                        return(
                            <Card  className="mb-4 py-4 card-fav-principal">
                                <Card.Body className="card-fav">
                                    <Card.Title className="fs-3 title-fav">{favorito.nomeFantasia}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{favorito.razaoSocial}</Card.Subtitle>
                                        <Button as={Link} to={`http://localhost:3000/cliente/restaurante/cardapio/${favorito.id}`}>
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
                    (<Loader/>):(
                        <div>
                            <Col>
                            {comidasFavoritas.map(comidafavorita =>{
                                return(
                                <Card  className="mb-4 py-4 card-fav-principal">
                                <Card.Body className="card-fav">
                                    <Card.Title className="fs-3 title-fav">{comidafavorita.nome}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Descrição: {comidafavorita.descricao}</Card.Subtitle>
                                        <Button as={Link} to={`http://localhost:3000/cliente/restaurante/cardapio/${comidafavorita.id}`}>
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
            <div className="botao-voltar-fav">
                <Button as={Link} to="/cliente/home">
                Voltar
                </Button>
            </div>
        </>
    );
}