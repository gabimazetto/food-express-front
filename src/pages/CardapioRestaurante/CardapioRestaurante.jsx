import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./CardapioRestaurante.css"
import { CardCardapioRestaurante } from "../../components/CardCardapioRestaurante/CardCardapioRestaurante";
import { Link } from "react-router-dom";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { ContextLogin } from "../../contexts/LoginContext";



export function CardapioRestaurante() {
  const [comidas, setComidas] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [comidasFiltradas, setComidasFiltradas] = useState(comidas);
  const [avaliacao, setAvaliacao] = useState(null);
  const [comentario, setComentario] = useState("");
  const { idRes } = useContext(ContextRestaurant);
  const { config } = useContext(ContextLogin);

  // INICIAR TABELA DE CARDÁPIO
  useEffect(() => {
    initializeTable();
  }, [idRes]);

  // FUNÇÃO INICIAR TABELA DE CARDÁPIO
  function initializeTable() {
    axios.get(`http://localhost:3001/restaurantes/${idRes}/cardapio/`, config)
      .then((response) => {
        setComidas(response.data);
        setComidasFiltradas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateData() {
    initializeTable();
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

  // Jogar depois para a listagem de pedidos

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
      <div className="container">
        <div className="container-titulo-cardapio">
          <h1 className="cardapio-titulo">Cardápio</h1>
          <Form>
            <InputGroup className="mb-3">
              <Form.Control
                value={pesquisa}
                onChange={handlePesquisa}
                placeholder="Pesquisar nome ou categoria"
                aria-label="Pesquisar nome ou categoria"
                aria-describedby="basic-addon2"
                className="min-input"
              />
            </InputGroup>
            <Button as={Link} to="/restaurante/cardapio/cadastro" className="min-input button-add-cardapio"> Adicionar novo</Button>
          </Form>
        </div>
        {comidasFiltradas === null ? (
          <Loader />
        ) : (
          <CardCardapioRestaurante
            comidas={comidasFiltradas}
            updateData={handleUpdateData}
          />
        )}
      </div>
    </>
  );
}
