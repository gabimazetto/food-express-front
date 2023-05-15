import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, InputGroup, Modal, Card } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import "./Cardapio.css"



export function Cardapio() {

    const [comidas, setComidas] = useState(null);
    const [show, setShow] = useState(false);
    const [showDetalhe, setShowDetalhe] = useState(false);
    const [idComida, setIdComida] = useState(null);
    const [pesquisa, setPesquisa] = useState('');
    const [comidasFiltradas, setComidasFiltradas] = useState(comidas);
    const [comidaSelecionada, setComidaSelecionada] = useState(null);

    // ABRIR MODAL EXCLUIR
    const handleShow = (id) =>{
        setIdComida(id);
        setShow(true);
    };
    // FECHAR MODAL EXCLUIR
    const handleClose = () =>{
        setIdComida(null);
        setShow(false);
    };

    // ABRIR MODAL DETALHES
    const handleshowDetalhe = (id) =>{
        setIdComida(id);
        detalheComida(id);
        setShowDetalhe(true);
    };
    // FECHAR MODAL DETALHES
    const handleClose2 = () =>{
        setIdComida(null);
        setShowDetalhe(false);
    };

    // INICIAR TABELA DE CARDÁPIO
    useEffect(() =>{
        initializeTable();
    }, []);

    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable(){
        axios.get("http://localhost:3001/comidas")
        .then((response) =>{
            setComidas(response.data);
            setComidasFiltradas(response.data);
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    // FUNÇÃO PESQUISAR POR NOME, CATEGORIA E DESCRIÇÃO
    const handlePesquisa = (event) =>{
        const pesquisa = event.target.value.toLowerCase();
        const comidasFiltradas = comidas.filter(
            (comida) => {
                return (
                    comida.nome.toLowerCase().includes(pesquisa) ||
                    comida.categoria.toLowerCase().includes(pesquisa) ||
                    comida.descricao.toLowerCase().includes(pesquisa)
                    );
            }
        );
        setPesquisa(pesquisa);
        setComidasFiltradas(comidasFiltradas);
    }


    // FUNÇÃO DELETAR COMIDA
    function onDelete(){
        axios.delete(`http://localhost:3001/comidas/${idComida}`)
        .then((response) =>{
            toast.success(response.data.message, {
                position: "bottom-right",
                duration: 2000
            });
            initializeTable();
        }).catch((error) =>{
            console.log(error);
            toast.error(error.response.data.message, {
                position: "bottom-right", 
                duration: 2000
            });
        });
        handleClose();
    }

    // FUNÇÃO DETALHE COMIDA 
    function detalheComida(id) {
        axios.get(`http://localhost:3001/comidas/${id}`)
    .then(response =>{
        setComidaSelecionada(response.data);
    }).catch(error =>{
        console.log(error);
    });
    }

    // FUNÇÃO EDITAR COMIDA
    //AQUI


    return(
        <>
        <div className="container">
        <div className="d-flex justify-content-between align-items-center">
                    <h1>Cardápio</h1>
                    <Form>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar nome ou categoria"
                                aria-label="Pesquisar nome ou categoria"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form>
                </div>
            {comidasFiltradas === null ? (
                <Loader />
            ) : (
                <Card className="card-cardapio">
                    {comidasFiltradas.map((comida) =>{
                        return (
                        <>
                        <Card.Img variant="top" src={comida.imagem} />
                        <Card.Body>
                            <Card.Title>{comida.nome}</Card.Title>
                            <Card.Text>
                        <>
                            <p key="descricao"><b>Descrição:</b> {comida.descricao}</p>
                            <p key="peso"><b>Peso:</b> {comida.peso}</p>
                            <p key="preco"><b>Preço:</b> {comida.preco}</p>
                            <p key="nome"><b>Categoria:</b> {comida.categoria}</p>
                        </>
                            </Card.Text>
            <Button variant="warning" onClick={()=>{handleShow(comida.id)}}>
                <i className="bi bi-trash-fill"></i>
            </Button>
            <Button  variant="warning" as={Link} to={`/comidas/editar/${comida.id}`}>
                <i className="bi bi-pencil-fill"></i>
            </Button>
            <Button onClick={() => handleshowDetalhe(comida.id)}>
                <i class="bi bi-card-list"></i>
            </Button>
        </Card.Body>
        </>
    )
})}
</Card>
            )
            }
            

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tem certeza que deseja excluir o Produto?</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onDelete} variant="danger" >
                            Excluir
                        </Button>
                        <Button  onClick={handleClose} variant="primary" >
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDetalhe} onHide={handleClose2}>
                {comidaSelecionada && (
                    <>
                    <Modal.Header closeButton>
                        <Modal.Title>{comidaSelecionada.nome}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        
                            <>
                            <img className="img-modal" src={comidaSelecionada.imagem} alt="Imagem da Comida" />
                            <p>Peso: {comidaSelecionada.peso}</p>
                            <p>Preço: {comidaSelecionada.preco}</p>
                            <p>Categoria: {comidaSelecionada.categoria}</p>
                            </>
                        

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose2} variant="danger" >
                            Fechar
                        </Button>
                    </Modal.Footer>
                    </>
                    )}
                </Modal>

        </div>
        </>
    );
}