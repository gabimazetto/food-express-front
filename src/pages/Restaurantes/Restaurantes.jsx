import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./style.css";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";
import Offcanvas from 'react-bootstrap/Offcanvas';


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
        const favoritos = localStorage.getItem('favoritos');
          if (favoritos) {
            favoritos = JSON.parse(favoritos);
          } else {
            favoritos = [];
          }
        const restaurantes = response.data.map((restaurante) => {
          const {
            endereco: { uf, cidade, cep, rua, numero, complemento },
          } = restaurante;
          return {
            ...restaurante,
            endereco: { uf, cidade, cep, rua, numero, complemento },
            favorito:  favoritos.includes(restaurante.id),
            media: 0,
          };
        });
        setRestaurantes(restaurantes);
        buscarMediaRestaurantes(restaurantes);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao carregar os restaurantes", {
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
        // Adicione o restaurante ao Local Storage
        const favoritos = localStorage.getItem('favoritos');
        if (favoritos) {
          favoritos = JSON.parse(favoritos);
        } else {
          favoritos = [];
        }
        favoritos.push(restauranteId);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      })
      .catch((error) => {
        toast.error("Algo deu errado", {
          position: "bottom-right",
          duration: 2000,
        });
      });
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
    <div className="container">
      <div className="navbar navbar-light bg-light">
        <h1>Restaurantes</h1>
        <div className="search-wrapper">
          <i className="bi bi-search"></i>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Nome/Cidade/Rua"
          />
        </div>
      </div>
      {restaurantes === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome Fantasia</th>
              <th>Cidade</th>
              <th>Rua</th>
              <th>Mais Detalhes</th>
              <th>Adicionar aos Favoritos</th>
              <th>Avaliações</th>
            </tr>
          </thead>
          <tbody>
            {restaurantes
              .filter((restaurante) => {
                const nomeFantasia = restaurante.nomeFantasia.toLowerCase();
                const cidade = restaurante.endereco.cidade.toLowerCase();
                const rua = restaurante.endereco.rua.toLowerCase();
                const termoBusca = busca.toLowerCase();
                return (
                  nomeFantasia.includes(termoBusca) ||
                  cidade.includes(termoBusca) ||
                  rua.includes(termoBusca)
                );
              })
              .map((restaurante) => {
                return (
                  <tr key={restaurante.id}>
                    <td>{restaurante.nomeFantasia}</td>
                    <td>{restaurante.endereco.cidade}</td>
                    <td>{restaurante.endereco.rua}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/cliente/restaurante/cardapio/${restaurante.id}`}
                      >
                        <i className="bi bi-book"></i>
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="submit"
                        onClick={() => FavRestaurante(restaurante.id)}
                      >
                        {restaurante.favorito ? (
                          <i className="bi bi-heart-fill"></i>
                        ) : (
                          <i className="bi bi-heart"></i>
                        )}
                      </Button>
                    </td>
                    {/* Inicio OffCanvas */}
                    <Button onClick={() => {
                      handleShow();
                      buscarComentariosAvaliacoes(restaurante.id);
                    }}>
                      <td>{mediasAvaliacoes[restaurante.id]}</td>
                    </Button>
                    <Offcanvas show={show} onHide={handleClose}>
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Avaliações</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        {comentariosAvaliacoes.map((comentario, index) => (
                          <div key={index}>
                            <p>Cliente: {comentario.nomeCliente}</p>
                            <p>Comentário: {comentario.comentario}</p>
                            <p>Nota: {comentario.nota}</p>
                          </div>
                        ))}
                      </Offcanvas.Body>
                    </Offcanvas>
                    {/* Final OffCanvas */}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )
      }
    </div >
  );
}
