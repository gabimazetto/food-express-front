import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./CardapioCliente.css";
import { CardCardapioCliente } from "../../components/CardCardapioCliente/CardCardapioCliente";
import { useParams } from "react-router-dom";
import { ContextLogin } from "../../contexts/LoginContext";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";

export function CardapioCliente() {
  const { config } = useContext(ContextLogin);
  const [comidas, setComidas] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [comidasFiltradas, setComidasFiltradas] = useState(comidas);

  const { id } = useParams();

  // INICIAR TABELA DE CARDÁPIO
  useEffect(() => {
    initializeTable();
  }, []);

  function handleUpdateData() {
    initializeTable();
  }

  // FUNÇÃO INICIAR TABELA DE CARDÁPIO
  function initializeTable() {
    axios
      .get(`http://localhost:3001/comidas/restaurante/${id}`, config)
      .then((response) => {
        setComidas(response.data);
        setComidasFiltradas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="cardapio-titulo mt-4 mb-4">Cardápio</h1>
            <div className="d-flex  justify-content-center "></div>
            <Form>
              <InputGroup className="mb-3 mt-4 ">
                <Form.Control
                  value={pesquisa}
                  onChange={handlePesquisa}
                  placeholder="Pesquisar "
                  aria-label="Pesquisar nome ou categoria"
                  aria-describedby="basic-addon2"
                  className="input-cardapio-cliente"
                />
              </InputGroup>
            </Form>
          </div>
          {comidasFiltradas === null ? (
            <Loader />
          ) : (
            <CardCardapioCliente
              comidas={comidasFiltradas}
              updateData={handleUpdateData}
            />
          )}
        </div>
        <div className="d-flex align-items-start justify-content-start mt-3 ms-1">
          <ButtonNavigation
            type="submit"
            route="/cliente/listar/restaurantes"
            icon="white bi bi-arrow-left-circle-fill"
            className="botao-voltar-cardapio d-flex align-items-center justify-content-center"
            tooltipContent="Voltar para restaurantes"
          />
        </div>
      </Container>
    </>
  );
}
