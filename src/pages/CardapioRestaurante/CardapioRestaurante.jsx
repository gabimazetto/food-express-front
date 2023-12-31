import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./CardapioRestaurante.css"
import { CardCardapioRestaurante } from "../../components/CardCardapioRestaurante/CardCardapioRestaurante";
import { Link } from "react-router-dom";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { ContextLogin } from "../../contexts/LoginContext";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";



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

  return (
    <>
      <Container>
        <div className="containerCardRest">
          <div className="container-titulo-cardapio">
            <h1 className="cardapio-titulo mt-4 mb-4">Cardápio</h1>
            <div className="d-flex flex-column">
              <Form>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={pesquisa}
                    onChange={handlePesquisa}
                    placeholder="Pesquisar"
                    aria-label="Pesquisar nome ou categoria"
                    aria-describedby="basic-addon2"
                    className="cardapio-input"
                  />
                </InputGroup>
              </Form>
              <div className="d-flex justify-content-evenly align-items-end mt-3 mb-3">

                <Button as={Link} to="/restaurante/cardapio/cadastro" className="min-input button-add-cardapio">
                  Adicionar novo
                </Button>
              </div>
            </div>
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
        <div className="d-flex justify-content-start align-items-start mt-3 mb-5">
          <ButtonNavigation
            type="submit"
            route="/restaurante/home"
            icon="white bi bi-arrow-left-circle-fill"
            className="botao-voltar-editar mb-5 d-flex justify-content-center align-items-center"
            tooltipContent="Voltar para a home"
          />
        </div>
      </Container>
    </>
  );
}
