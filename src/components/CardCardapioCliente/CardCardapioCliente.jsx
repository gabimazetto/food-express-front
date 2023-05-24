import "./CardCardapioCliente.css";
import { useContext, useEffect, useState } from "react";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";
import { ContextSacolaCompras } from "../../contexts/SacolaComprasContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { CustomInputIconNone } from "../CustomInputIconNone/CustomInputIconNone";
import { useForm } from "react-hook-form";
import { CarrinhoCompras } from "../CarrinhoCompras/CarrinhoCompras";


export function CardCardapioCliente({ className, comidas, updateData }) {
  const dayjs = require("dayjs");
  const [cardapio, setCardapio] = useState([]);
  const { idCli } = useContext(ContextClient);
  const { config } = useContext(ContextLogin);
  const today = dayjs();
  const dataRegistro = today.format("YYYY-MM-DD");
  const [show, setShow] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);
  const [restauranteId, setRestauranteId] = useState(null);
  const [comidaId, setComidaId] = useState(null);
  const { attItem, novoItem, addPedidoItem, delItens, delPedido } = useContext(ContextSacolaCompras);



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: "Aguardando confirmação",
    },
  });

  useEffect(() => {
    initializeTable();
  }, [updateData, idCli]);

  function initializeTable() {
    setCardapio(comidas);
  }

  const handleClose = () => setShow(false);
  const handleShow = (pedidoId, restauranteId, comidaId) => {
    setPedidoId(pedidoId);
    setRestauranteId(restauranteId);
    setComidaId(comidaId);
    setShow(true);
  };

  function FavComida(comidaId) {
    const data = {
      favoritar: true,
      comidaId,
      clienteId: idCli,
    };
    axios
      .post("http://localhost:3001/comidas/favoritos", data, config)
      .then((response) => {
        toast.success("Adicionado aos Favoritos", {
          position: "bottom-right",
          duration: 2000,
        });
        setCardapio((prevCardapio) =>
          prevCardapio.map((comida) =>
            comida.id === comidaId ? { ...comida, favorito: true } : comida
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


  const addComida = (comidaId, restauranteId) => {
    axios
      .get(`http://localhost:3001/pedidos/${idCli}`, config)
      .then((response) => {
        const pedidoStatus = response.data.map((pedido) => {
          const { status, restauranteId, clienteId, items } = pedido;
          return {
            ...pedido,
            pedido: { status, restauranteId, clienteId },
            items: items.map(({ id, quantidade, comida }) => ({
              id,
              quantidade,
              comida: { id: comida.id },
            })),
          };
        });
  
        if (pedidoStatus.length > 0) {
          const pedidoExistente = pedidoStatus[0];
          if (pedidoExistente.pedido.restauranteId === restauranteId) {
            const itemExistente = pedidoExistente.items.find(
              (item) => item.comida.id === comidaId
            );
            if (itemExistente) {
              attItem(
                comidaId,
                pedidoExistente.id,
                itemExistente.id,
                itemExistente.quantidade + 1
              );
            } else {
              novoItem(comidaId, pedidoExistente.id);
            }
          } else {
            handleShow(pedidoExistente.id, restauranteId, comidaId);
          }
        } else {
          addPedidoItem(restauranteId, comidaId);
        }    
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const deletar = async (pedidoId, restauranteId, comidaId) => {
    handleClose();
    await delItens(pedidoId);
    await delPedido(pedidoId);
    addPedidoItem(restauranteId, comidaId);
  };

  function onSubmit(data) {
    const {
      status,
      quantidade,
      metodoPagamento,
      enderecoPedido: { uf, cidade, cep, rua, numero, complemento },
    } = data;
    axios.put("http://localhost:3001/pedidos", {
      status,
      metodoPagamento,
      enderecoPedido: {
        uf,
        cidade,
        cep,
        rua,
        numero,
        complemento,
      },
    }, config)
      .then((response) => {
        toast.success("Pedido atualizado", {
          position: "bottom-right",
          duration: 2000,
        });
      })
      .catch((error) => {
        toast.error("Algo deu errado", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });

    axios
      .put(`http://localhost:3001/items`, { quantidade }, config)
      .then((response) => {
        toast.success("Pedido encaminhado para produção", {
          position: "bottom-right",
          duration: 2000,
        });
      })
      .catch((error) => {
        toast.error("Algo deu errado", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }




  return (
    <main
      className={`main-card-cliente invisivel-desktop  d-flex flex-column align-items-center ${className}`}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja esvaziar o pedido atual?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary button-cancelar-modal" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="secondary"
            onClick={() => deletar(pedidoId, restauranteId, comidaId)}
          >
            Excluir e adicionar item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container-cards-cliente">
        {cardapio === null ? (
          <Loader />
        ) : (
          cardapio.map((comida) => {
            return (
              <article
                className={`article-home-cliente ${className}`}
                key={comida.id}
              >
                <div className="header-cards-cliente">
                  <img src={comida.imagem} alt="" />
                </div>
                <div className="article-body-cliente">
                  <div className="titulo-card-cliente">
                    <h1 className="d-flex zerando-margin">{comida.nome}</h1>
                    <Link>
                      <button
                        className="cards-botoes"
                        onClick={() => FavComida(comida.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {comida.favorito ? (
                          <i className="bi bi-heart-fill d-flex align-items-center"></i>
                        ) : (
                          <i className="bi bi-heart d-flex align-items-center"></i>
                        )}
                      </button>
                    </Link>
                  </div>
                  <div className="infos-card-cliente">
                    <p className="descricao-cliente zerando-margin">
                      {comida.descricao}
                    </p>
                    <p className="zerando-margin">
                      <b>Peso (gramas):</b> {comida.peso}
                    </p>
                    <p className="zerando-margin">
                      <b>Categoria: </b>
                      {comida.categoria}
                    </p>
                  </div>
                  <div className="preco-card-cliente">
                    <h1 className="d-flex align-items-center zerando-margin">
                      R$ {comida.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </h1>
                    <button
                      className="cards-botoes"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        addComida(comida.id, comida.restauranteId);
                      }}
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
      <CarrinhoCompras />
    </main>
  );
}
