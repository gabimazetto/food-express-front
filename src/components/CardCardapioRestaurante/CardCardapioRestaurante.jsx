import "./CardCardapioRestaurante.css"
import { useContext, useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Loader } from "../../components/Loader/Loader";
import { Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ContextLogin } from "../../contexts/LoginContext"


export function CardCardapioRestaurante({ className, comidas, updateData }) {
    const [cardapio, setCardapio] = useState([])
    const [show, setShow] = useState(false);
    const [idComida, setIdComida] = useState(null);
    const { config } = useContext(ContextLogin);


    useEffect(() => {
        initializeTable();
    }, [updateData]);


    function initializeTable() {
        setCardapio(comidas)
    }


    function onDelete() {
        axios.delete(`http://localhost:3001/comidas/${idComida}`, config)
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

                    cardapio.map((cardapio) => {
                        return (
                            <article className={`article-home-restaurante ${className}`} key={cardapio.id}>
                                <div className="header-cards-restaurante">
                                    <img src={cardapio.imagem} alt="" />
                                </div>
                                <div className="article-body">
                                    <div className="">
                                        <span className="d-flex zerando-margin"><b>Cod.:  </b>{cardapio.codigo}</span>
                                    </div>
                                    <div className="titulo-card-restaurante d-flex justify-content-around">
                                        <h1 className="d-flex zerando-margin">{cardapio.nome}</h1>
                                        <Link to={`/restaurante/cardapio/item/${cardapio.id}`}>
                                            <button className="cards-botoes" style={{ cursor: 'pointer' }}>
                                                <i className="bi bi-pencil-fill d-flex align-items-center"></i>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="infos-card">
                                        <p className="descricao zerando-margin">{cardapio.descricao}</p>
                                        <p className="zerando-margin"><b>Peso:</b> {cardapio.peso} g</p>
                                        <p className="zerando-margin"><b>Categoria: </b>{cardapio.categoria}</p>
                                    </div>
                                    <div className="preco-card-restaurante">
                                        <h1 className="d-flex align-items-center zerando-margin">R$ {parseFloat(cardapio.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h1>

                                        <button className="cards-botoes" onClick={() => handleShow(cardapio.id)} style={{ cursor: 'pointer' }}>
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
                    <Button onClick={onDelete} variant="primary">
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