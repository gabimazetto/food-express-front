import { useContext, useEffect, useState } from "react";
import "./CardPedidoCliente.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";

export function CardPedidoCliente({ pedido }) {
  const { idCli } = useContext(ContextClient);
  const { config } = useContext(ContextLogin);
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");
  const [avaliacaoExistente, setAvaliacaoExistente] = useState(false);
  const dayjs = require("dayjs");
  const dataPedido = dayjs(pedido.dataRegistro);
  useEffect(() => {
    initializeAvaliacaoExistente();
    carregarComentario();
  }, []);

  function initializeAvaliacaoExistente() {
    axios
      .get(`http://localhost:3001/avaliacaos/cliente/${idCli}`, config)
      .then((response) => {
        const avaliacoesCliente = response.data;
        const avaliacaoExistente = avaliacoesCliente.some(
          (avaliacao) => avaliacao.pedidoId === pedido.id
        );
        setAvaliacaoExistente(avaliacaoExistente);
      })
      .catch((error) => {
        toast.error("Erro ao carregar dados.");
      });
  }

  function carregarComentario() {
    axios
      .get(`http://localhost:3001/avaliacaos/cliente/${idCli}`, config)
      .then((response) => {
        const avaliacoesCliente = response.data;
        const avaliacao = avaliacoesCliente.find(
          (avaliacao) => avaliacao.pedidoId === pedido.id
        );
        if (avaliacao) {
          setComentario(avaliacao.comentario);
          setAvaliacao(avaliacao.avaliacao);
        }
      })
      .catch((error) => {
        toast.error("Erro ao carregar dados.");
      });
  }

  function EnviarAvaliacao(restauranteId, pedidoId) {
    const data = {
      avaliacao: String(avaliacao),
      comentario: comentario,
      clienteId: idCli,
      restauranteId: restauranteId,
      pedidoId: pedidoId,
    };

    axios
      .post(`http://localhost:3001/avaliacaos`, data, config)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        setAvaliacaoExistente(true);
        carregarComentario();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });

    setAvaliacao(0);
    setComentario("");
  }

  function estrelas() {
    const maxAvaliacao = 5;
    const estrelas = [];

    if (avaliacaoExistente) {
      for (let i = 1; i <= maxAvaliacao; i++) {
        const classeEstrela =
          i <= Number(avaliacao) ? "bi bi-star-fill" : "bi bi-star";

        estrelas.push(
          <i
            className={classeEstrela}
            key={i}
            style={{ cursor: "default" }}
          ></i>
        );
      }
    } else {
      for (let i = 1; i <= maxAvaliacao; i++) {
        const classeEstrela =
          i <= Number(avaliacao) ? "bi bi-star-fill" : "bi bi-star";

        estrelas.push(
          <i
            className={classeEstrela}
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() => setAvaliacao(i)}
          ></i>
        );
      }
    }

    return estrelas;
  }

  return (
    <div className="container-cards-pedidos">
      <article className="article-cards-pedidos" key={pedido.id}>
        <div className="foto-cards-pedidos">
          <h1>{pedido.restaurante.nomeFantasia}</h1>
          <Button
            as={Link}
            to={`/cliente/pedidos/${pedido.id}`}
            className="botao-cards-detalhes"
          >
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
        <div className="vertical-row-pedidos"></div>
        <div className="items-cards-pedidos">
          <div className="mb-2 d-flex flex-column">
            <p>
              <b>Data:</b> {dataPedido.format("DD/MM/YYYY")}
            </p>
            {pedido.status === "Pendente" ? (
              <p>
                <b>Status:</b> {pedido.status}
              </p>
            ) : pedido.status === "Aguardando confirmação" ? (
              <p>
                Status: <b className="aguardando">{pedido.status}</b>
              </p>
            ) : pedido.status === "Confirmado" ? (
              <p>
                Status:<b className="confirmado"> {pedido.status}</b>
              </p>
            ) : pedido.status === "A caminho" ? (
              <p>
                Status: <b className="aCaminho">{pedido.status}</b>
              </p>
            ) : pedido.status === "Entregue" ? (
              <p>
                Status: <b className="entregue">{pedido.status}</b>
              </p>
            ) : pedido.status === "Cancelado" ? (
              <p>
                Status: <b className="cancelado">{pedido.status}</b>
              </p>
            ) : null}
          </div>
          <div className="vertical-row-pedidos mb-1"></div>
          <div className="itens-cards-container">
            {pedido.items.map(item => (
              <p key={item.id}><b>{item.quantidade}x </b> {item.comida?.nome}</p>
            ))}
          </div>
        </div>
        <div className="vertical-row-pedidos"></div>
        {
          pedido.status === "Entregue" ? (
            <>
              {avaliacaoExistente ? (
                <div className="avaliacao-enviada">
                  <div className="avaliacao mt-2">
                    <p>
                      <b>Avaliação:</b>
                    </p>
                    <div className="rating-stars">{estrelas()}</div>
                    <div className="vertical-row-pedidos mt-2 mb-2"></div>
                  </div>
                  <p>Comentário: {comentario}</p>
                </div>
              ) : (
                <div className="input-card-pedido">
                  <div className="container-avaliacao-pedidos mt-2">
                    <p>
                      <b>Avaliação:</b>
                    </p>
                    <div className="rating-stars">{estrelas()}</div>
                  </div>
                  <Form.Control
                    className="input-avaliacao mb-1 mt-2"
                    type="text"
                    placeholder="Escreva aqui sua avaliação"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                  <Button
                    onClick={() => EnviarAvaliacao(pedido.restauranteId, pedido.id)}
                    variant="primary input-avaliacao "
                    className="mb-2"
                  >
                    Enviar avaliação
                  </Button>
                </div>
              )}
              {/* <div className="refazer-cards-pedidos">
                <div>
                  <Button className="botoes-card-pedidos">Refazer pedido</Button>
                </div>
              </div> */}
            </>) : (<>
              <div className="endereco-cards-pedido">
                <p>{(pedido.enderecoPedido?.rua).toUpperCase()}, {pedido.enderecoPedido?.numero}, COMPL.: {(pedido.enderecoPedido?.complemento).toUpperCase()}, {pedido.enderecoPedido?.cep}</p>
                <p>CEP: {pedido.enderecoPedido?.cep}</p>
              </div>
              <div className="vertical-row-pedidos mt-2 mb-2"></div>
              <Button className="botoes-card-pedidos" as={Link} to="/contato">Ajuda</Button>
            </>)
        }
      </article>
    </div>
  );
}
