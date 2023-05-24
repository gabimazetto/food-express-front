import { useContext, useEffect, useState } from "react";
import "./CardPedidoCliente.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import fotoTesteLogo from "../../assets/images/10.png";
import { Loader } from "../Loader/Loader";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";

function PedidoCliente({ pedido }) {
  const { idCli } = useContext(ContextClient);
  const { config } = useContext(ContextLogin);
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");
  const [avaliacaoExistente, setAvaliacaoExistente] = useState(false);

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
          i <= Number(avaliacao)
            ? "bi bi-star-fill"
            : "bi bi-star";

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
          i <= Number(avaliacao)
            ? "bi bi-star-fill"
            : "bi bi-star";

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
    <Form>
      <article className="article-cards-pedidos" key={pedido.id}>
        <div className="foto-cards-pedidos">
          <img src={fotoTesteLogo} className="card-foto-pedido" alt="" />
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
          <div className="mb-2">
            <p>
              <b>Data:</b> {pedido.dataRegistro}
            </p>
          </div>
          <div className="mb-2">
            {pedido.status === "Pendente" ? (
              <p><b>Status:</b> {pedido.status}</p>
            ) : pedido.status === "Aguardando confirmação" ? (
              <p>Status: <b className="aguardando">{pedido.status}</b></p>
            ) : pedido.status === "Confirmado" ? (
              <p>Status:<b className="confirmado"> {pedido.status}</b></p>
            ) : pedido.status === "A caminho" ? (
              <p>Status: <b className="aCaminho">{pedido.status}</b></p>
            ) : pedido.status === "Entregue" ? (
              <p>Status: <b className="entregue">{pedido.status}</b></p>
            ) : pedido.status === "Cancelado" ? (
              <p>Status: <b className="cancelado">{pedido.status}</b></p>
            ) : null}
          </div>
          <div className="itens-cards-container">
            {pedido.items.map(item => (
              <p key={item.id}><b>{item.quantidade}</b> {item.comida?.nome}</p>
            ))}
          </div>
        </div>
        <div className="vertical-row-pedidos"></div>
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
          <div className="rest-cards-pedidos">
            <div className="rating-stars">{estrelas()}</div>
            <Form.Label>Avaliação</Form.Label>
            <Form.Control
              className="w-25"
              type="text"
              placeholder="Escreva aqui sua avaliação"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <Button
              onClick={() => EnviarAvaliacao(pedido.restauranteId, pedido.id)}
              variant="primary"
            className="mb-2"
             >
              Enviar avaliação
            </Button>
          </div>
        )}

        <div className="refazer-cards-pedidos">
          <div>
            {/* <Button className="botoes-card-pedidos">Ajuda</Button> */}
            <Button className="botoes-card-pedidos">Refazer pedido</Button>
          </div>
        </div>
      </article>
    </Form>
  );
}

export function CardPedidoCliente() {
  const [pedidos, setPedidos] = useState([]);
  const { idCli } = useContext(ContextClient);
  const { config } = useContext(ContextLogin);

  useEffect(() => {
    initializeTable();
    const attPagina = setInterval(() => {
      initializeTable();
    }, 5000);


    return () => clearInterval(attPagina)
  }, [idCli]);


  function initializeTable() {
    axios
      .get(`http://localhost:3001/pedidos/cliente/${idCli}`, config)
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        toast.error("Erro ao carregar dados.");
      });
  }
  return (
    <>
      <main className="main-card-pedido">
        <section className="section-cards-pedidos">
          {pedidos === null ? (
            <Loader />
          ) : (
            pedidos.map((pedido) => (
              <PedidoCliente key={pedido.id} pedido={pedido} />
            ))
          )}
        </section>
      </main>
    </>
  );
}