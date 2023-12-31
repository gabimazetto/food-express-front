import "./CardCardapioCliente.css";
import { useContext, useEffect, useState } from "react";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";
import { ContextSacolaCompras } from "../../contexts/SacolaComprasContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { CarrinhoCompras } from "../CarrinhoCompras/CarrinhoCompras";


export function CardCardapioCliente({ className, comidas, updateData }) {
  const [cardapio, setCardapio] = useState([]);
  const { idCli } = useContext(ContextClient);
  const { config } = useContext(ContextLogin);
  const [show, setShow] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);
  const [restauranteId, setRestauranteId] = useState(null);
  const [comidaId, setComidaId] = useState(null);
  const { attItem, novoItem, addPedidoItem, delItens, delPedido } = useContext(ContextSacolaCompras);



  useEffect(() => {
    function initializeTable() {
      setCardapio(comidas);
    }

    initializeTable();
  }, [comidas]);
  



  const handleClose = () => setShow(false);
  const handleShow = (pedidoId, restauranteId, comidaId) => {
    setPedidoId(pedidoId);
    setRestauranteId(restauranteId);
    setComidaId(comidaId);
    setShow(true);
  };

  async function handleFavoritaComida(comida) {
    const data = {
      favoritar: true,
      comidaId: comida.id,
      clienteId: idCli,
    };
    try{
      const response = await axios.patch("http://localhost:3001/favoritos/comidas/", data, config);
      toast.success(`${response.data.message}`, {
        position: "bottom-right",
        duration: 2000,
      });
      const newList = cardapio.map((item) => {
        const favorito = (item.id === comida.id) ? !comida.favorito : item.favorito;
        return {...item, favorito}
      })
      setCardapio(newList);
      

    }catch(err){

    }
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
            if (pedidoExistente.items.length === 0) {
              delPedido(pedidoExistente.id);
              addPedidoItem(restauranteId, comidaId);
            } else {
              handleShow(pedidoExistente.id, restauranteId, comidaId);
            }
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
            const classFavorito = comida.favorito ? "bi bi-heart-fill d-flex align-items-center" : "bi bi-heart d-flex align-items-center";
            
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
                        onClick={() => handleFavoritaComida(comida)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={classFavorito}></i>
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
