import "./CardCardapioRestaurante.css"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Loader } from "../Loader/Loader";
import { Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"


export function CardCardapioRestaurante({ className, comidas, updateData }) {
    const [cardapio, setCardapio] = useState([])
    const [show, setShow] = useState(false);
    const [idComida, setIdComida] = useState(null);


    useEffect(() => {
        initializeTable();
    }, [updateData]);


    function initializeTable() {
        axios.get(`http://localhost:3001/comidas`)
            .then((response) => {
                setCardapio(response.data)
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }


    function onDelete() {
        axios.delete(`http://localhost:3001/comidas/${idComida}`)
            .then((response) => {
                toast.success(response.data.message, {
                    position: "bottom-right",
                    duration: 2000
                });
                updateData();
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    duration: 2000
                });
            });
        handleClose();
    }

    // ABRIR MODAL EXCLUIR
    const handleShow = (id) => {
        setIdComida(id);
        setShow(true);
    };
    // FECHAR MODAL EXCLUIR
    const handleClose = () => {
        setIdComida(null);
        setShow(false);
    };

    return (
        <main className={`main-home-restaurante invisivel-desktop  d-flex flex-column align-items-center ${className}`}>
            <div className="container-cards">
                {cardapio === null ? (
                    <Loader />
                ) : (

                    comidas.map((comida) => {
                        return (
                            <article className={`article-home-restaurante ${className}`} key={comida.id}>
                                <div className="header-cards-restaurante">
                                    <img src={comida.imagem} alt="" />
                                </div>
                                <div className="article-body">
                                    <div className="">
                                        <span className="d-flex zerando-margin"><b>Cod.:  </b>{comida.codigo}</span>
                                    </div>
                                    <div className="titulo-card-restaurante d-flex justify-content-around">
                                        <h1 className="d-flex zerando-margin">{comida.nome}</h1>
                                        <Link to={`/restaurante/cardapio/item/${comida.id}`}>
                                            <button className="cards-botoes" style={{ cursor: 'pointer' }}>
                                                <i className="bi bi-pencil-fill d-flex align-items-center"></i>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="infos-card">
                                        <p className="descricao zerando-margin">{comida.descricao}</p>
                                        <p className="zerando-margin"><b>Peso:</b> {comida.peso}</p>
                                        <p className="zerando-margin"><b>Categoria: </b>{comida.categoria}</p>
                                    </div>
                                    <div className="preco-card-restaurante">
                                        <h1 className="d-flex align-items-center zerando-margin">R$ {comida.preco}</h1>
                                        <button className="cards-botoes" onClick={() => handleShow(comida.id)} style={{ cursor: 'pointer' }}>
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        )
                    })
                )}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o Produto?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={onDelete} variant="danger">
                        Excluir
                    </Button>
                    <Button onClick={handleClose} variant="primary">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}