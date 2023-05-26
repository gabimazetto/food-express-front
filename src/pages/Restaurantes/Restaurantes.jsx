import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Restaurante.css";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReactStars from "react-stars";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";


export function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState(null);
  const [busca, setBusca] = useState("");
  const { idCli } = useContext(ContextClient);
  const { config } = useContext(ContextLogin);
  const [mediasAvaliacoes, setMediasAvaliacoes] = useState({});
  const [comentariosAvaliacoes, setComentariosAvaliacoes] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    initializeTable();
  }, [idCli]);


  function initializeTable() {
    axios.get("http://localhost:3001/restaurantes", config)
      .then((response) => {
        const restaurantes = response.data.map((restaurante) => {
          const {
            endereco: { uf, cidade, cep, rua, numero, complemento },
          } = restaurante;
          return {
            ...restaurante,
            endereco: { uf, cidade, cep, rua, numero, complemento },
            favorito: false,
            media: 0,
          };
        });
        setRestaurantes(restaurantes);
        buscarMediaRestaurantes(restaurantes);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function FavRestaurante(restauranteId) {
    const data = {
      favoritar: true,
      restauranteId,
      clienteId: idCli,
    };
    axios.post("http://localhost:3001/restaurantes/favoritos", data, config)
      .then((response) => {
        toast.success("Adicionado aos Favoritos", {
          position: "bottom-right",
          duration: 2000,
        });
        setRestaurantes((prevRestaurantes) =>
          prevRestaurantes.map((restaurante) =>
            restaurante.id === restauranteId
              ? { ...restaurante, favorito: true }
              : restaurante
          )
        );
      })
      .catch((error) => {
        toast.error("Algo deu errado", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }

  async function buscarMediaRestaurantes(restaurantes) {
    try {
      const medias = {};
      for (const restaurante of restaurantes) {
        const response = await axios.get(`http://localhost:3001/avaliacaos/media/${restaurante.id}`, config);
        const media = response.data.media;
        medias[restaurante.id] = media;
      }
      setMediasAvaliacoes(medias);
    } catch (error) {
      console.log(error);
    }
  }

  async function buscarComentariosAvaliacoes(restauranteId) {
    try {
      const response = await axios.get(`http://localhost:3001/avaliacaos/${restauranteId}`, config);
      const comentarios = response.data.map((avaliacao) => ({
        comentario: avaliacao.comentario,
        nota: avaliacao.avaliacao,
        nomeCliente: avaliacao.cliente.nome,
      }));
      setComentariosAvaliacoes(comentarios);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <div className="navbar nav-rest">
        <h1 className="mt-4 mb-4">Restaurantes</h1>

        <form className="form-rest form-inline">
          <input type="text" className="search-rest"
            value={busca}
            onChange={(e) => setBusca(e.target.value)} placeholder="Pesquise por nome ou cidade" />
        </form>

      </div>

      {restaurantes === null ? (
        <Loader />
      ) : (
        <Row>
          {restaurantes
            .filter((restaurante) => {
              const nomeFantasia = restaurante.nomeFantasia.toLowerCase();
              const cidade = restaurante.endereco.cidade.toLowerCase();
              const termoBusca = busca.toLowerCase();
              return (
                nomeFantasia.includes(termoBusca) ||
                cidade.includes(termoBusca)
              );
            })
            .map((restaurante) => {
              return (
                <Col md={4} key={restaurante.id}>
                  <Card className="mb-4 py-4 card-principal">
                    <Card.Body className="card-rest">
                      <Card.Title className="fs-3 title-rest">{restaurante.nomeFantasia}</Card.Title>

                      <Card.Subtitle className="mb-2 text-muted">
                        Cidade: {restaurante.endereco.cidade}
                      </Card.Subtitle>
                      <div className="icons-rest">
                        <Button className="detalhes my-button-not-filled-rest"
                          as={Link}
                          to={`/cliente/restaurante/cardapio/${restaurante.id}`}
                        >
                          <i className="bi bi-book"></i> Mais Detalhes
                        </Button>
                        <Button className="my-button-not-filled-rest"
                          type="submit"
                          onClick={() => FavRestaurante(restaurante.id)}
                        >
                          {restaurante.favorito ? (
                            <i className="bi bi-heart-fill icon-list-rest"></i>
                          ) : (
                            <i className="bi bi-heart"></i>
                          )}

                        </Button>

                        <Button className="my-button-not-filled-rest" onClick={() => {
                          handleShow();
                          buscarComentariosAvaliacoes(restaurante.id);
                        }}>
                          <ReactStars
                            count={5}
                            value={mediasAvaliacoes[restaurante.id]}
                            size={24}
                            color2={'#f06000'}
                            edit={false}  // Isso desabilita a possibilidade do usuário alterar o valor
                          />
                        </Button>

                        <Offcanvas show={show} onHide={handleClose}>
                          <Offcanvas.Header closeButton className="offcanvas-header">
                            <Offcanvas.Title className="offcanvas-title">Avaliações</Offcanvas.Title>
                          </Offcanvas.Header>
                          <Offcanvas.Body className="offcanvas-body">
                            {comentariosAvaliacoes.map((comentario, index) => (
                              <div key={index}>
                                <p>Cliente: {comentario.nomeCliente}</p>
                                <p>Comentário: {comentario.comentario}</p>
                                <p>Nota: {comentario.nota}</p>
                                <hr />
                              </div>
                            ))}
                          </Offcanvas.Body>
                        </Offcanvas>

                      </div>
                    </Card.Body>
                  </Card>

                </Col>
              );
            })}
        </Row>
      )}
      <div className="d-flex align-items-start justify-content-start  mt-3 ms-1 ">
        <ButtonNavigation
          type="submit"
          route="/"
          icon="white bi bi-arrow-left-circle-fill"
          className="botao-voltar-rest d-flex align-items-center justify-content-center"
          tooltipContent="Voltar para a home"
        />
      </div>
    </Container>


    // <div className="container">
    //   <div className="navbar navbar-light bg-light">
    //     <h1>Restaurantes</h1>
    //     <div className="search-wrapper">
    //       <i className="bi bi-search"></i>
    //       <input
    //         type="text"
    //         value={busca}
    //         onChange={(e) => setBusca(e.target.value)}
    //         placeholder="Nome/Cidade/Rua"
    //       />
    //     </div>
    //   </div>
    //   {restaurantes === null ? (
    //     <Loader />
    //   ) : (
    //     <Table striped bordered hover>
    //       <thead>
    //         <tr>
    //           <th>Nome Fantasia</th>
    //           <th>Cidade</th>
    //           <th>Rua</th>
    //           <th>Mais Detalhes</th>
    //           <th>Adicionar aos Favoritos</th>
    //           <th>Avaliações</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {restaurantes
    //           .filter((restaurante) => {
    //             const nomeFantasia = restaurante.nomeFantasia.toLowerCase();
    //             const cidade = restaurante.endereco.cidade.toLowerCase();
    //             const rua = restaurante.endereco.rua.toLowerCase();
    //             const termoBusca = busca.toLowerCase();
    //             return (
    //               nomeFantasia.includes(termoBusca) ||
    //               cidade.includes(termoBusca) ||
    //               rua.includes(termoBusca)
    //             );
    //           })
    //           .map((restaurante) => {
    //             return (
    //               <tr key={restaurante.id}>
    //                 <td>{restaurante.nomeFantasia}</td>
    //                 <td>{restaurante.endereco.cidade}</td>
    //                 <td>{restaurante.endereco.rua}</td>
    //                 <td>
    //                   <Button
    //                     as={Link}
    //                     to={`/cliente/restaurante/cardapio/${restaurante.id}`}
    //                   >
    //                     <i className="bi bi-book"></i>
    //                   </Button>
    //                 </td>
    //                 <td>
    //                   <Button
    //                     type="submit"
    //                     onClick={() => FavRestaurante(restaurante.id)}
    //                   >
    //                     {restaurante.favorito ? (
    //                       <i className="bi bi-heart-fill"></i>
    //                     ) : (
    //                       <i className="bi bi-heart"></i>
    //                     )}
    //                   </Button>
    //                 </td>
    //                 {/* Inicio OffCanvas */}
    //                 <Button onClick={() => {
    //                   handleShow();
    //                   buscarComentariosAvaliacoes(restaurante.id);
    //                 }}>
    //                   <td>{mediasAvaliacoes[restaurante.id]}</td>
    //                 </Button>
    //                 <Offcanvas show={show} onHide={handleClose}>
    //                   <Offcanvas.Header closeButton>
    //                     <Offcanvas.Title>Avaliações</Offcanvas.Title>
    //                   </Offcanvas.Header>
    //                   <Offcanvas.Body>
    //                     {comentariosAvaliacoes.map((comentario, index) => (
    //                       <div key={index}>
    //                         <p>Cliente: {comentario.nomeCliente}</p>
    //                         <p>Comentário: {comentario.comentario}</p>
    //                         <p>Nota: {comentario.nota}</p>
    //                       </div>
    //                     ))}
    //                   </Offcanvas.Body>
    //                 </Offcanvas>
    //                 {/* Final OffCanvas */}
    //               </tr>
    //             );
    //           })}
    //       </tbody>
    //     </Table>
    //   )
    //   }
    // </div >
  );
}
