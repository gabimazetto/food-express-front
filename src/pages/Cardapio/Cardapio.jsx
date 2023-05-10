import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, InputGroup, Modal, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";



export function Cardapio() {

    const [comidas, setComidas] = useState(null);
    const [show, setShow] = useState(false);
    const [idComida, setIdComida] = useState(null);
    const [pesquisa, setPesquisa] = useState('');
    const [comidasFiltradas, setComidasFiltradas] = useState(comidas);

    // ABRIR MODAL
    const handleShow = (id) =>{
        setIdComida(id);
        setShow(true);
    };
    // FECHAR MODAL
    const handleClose = () =>{
        setIdComida(null);
        setShow(false);
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
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Peso</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {comidasFiltradas.map((comida) =>{
                        return (
                            <tr key={comida.id}>
                                <td>{comida.codigo}</td>
                                <td>{comida.nome}</td>
                                <td>{comida.descricao}</td>
                                <td>{comida.categoria}</td>
                                <td>{comida.preco}</td>
                                <td>{comida.peso}</td>
                                <td>{comida.imagem}</td>
                                <td className="d-flex gap-2">
                                <Button onClick={() => handleShow(comida.id)}>
                                    <i className="bi bi-trash-fill"></i>
                                </Button>
                                <Button as={Link} to={`/comidas/editar/${comida.id}`}>
                                    <i className="bi bi-pencil-fill"></i>
                                </Button>
                                </td>


                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            )
            }
            

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tem certeza que deseja excluir o Produto?</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose} variant="danger" >
                            Cancelar
                        </Button>
                        <Button onClick={onDelete} variant="primary" >
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>


        </div>
        </>
    );
}