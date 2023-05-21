import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./style.css";
import { ContextClient } from "../../contexts/ClientContext";

export function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState(null);
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const { idCli } = useContext(ContextClient);

  useEffect(() => {
    initializeTable();
  }, [idCli]);

  function initializeTable() {
    axios
      .get("http://localhost:3001/restaurantes")
      .then((response) => {
        const restaurantes = response.data.map((restaurante) => {
          const {
            endereco: { uf, cidade, cep, rua, numero, complemento },
          } = restaurante;
          return {
            ...restaurante,
            endereco: { uf, cidade, cep, rua, numero, complemento },
            favorito: false, // Adicionado o campo 'favorito' inicializado como falso
          };
        });
        setRestaurantes(restaurantes);
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
    axios
      .post("http://localhost:3001/restaurantes/favoritos", data)
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

  return (
    <div className="container">
      {/* Busca inicio */}
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
      {/* Busca Fim */}
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
            </tr>
          </thead>
          <tbody>
            {restaurantes
              .filter((restaurante) => {
                //campo de busca2 inicio
                const nomeFantasia = restaurante.nomeFantasia.toLowerCase();
                const cidade = restaurante.endereco.cidade.toLowerCase();
                const rua = restaurante.endereco.rua.toLowerCase();
                const termoBusca = busca.toLowerCase();

                return (
                  nomeFantasia.includes(termoBusca) ||
                  cidade.includes(termoBusca) ||
                  rua.includes(termoBusca)
                );
              }) // campo de busca2 fim
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
                        {restaurante.favorito ? ( // Renderização condicional do ícone de favorito
                          <i className="bi bi-heart-fill"></i>
                        ) : (
                          <i className="bi bi-heart"></i>
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
