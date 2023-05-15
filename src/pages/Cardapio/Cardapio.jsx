import axios from "axios";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./Cardapio.css"
import { CardCardapioRestaurante } from "../../components/CardCardapioRestaurante/CardCardapioRestaurante";


export function Cardapio() {
  const [comidas, setComidas] = useState(null);
  const [show, setShow] = useState(false);
  const [showDetalhe, setShowDetalhe] = useState(false);
  const [idComida, setIdComida] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [comidasFiltradas, setComidasFiltradas] = useState(comidas);
  const [comidaSelecionada, setComidaSelecionada] = useState(null);
  const [avaliacao, setAvaliacao] = useState(null);
  const [comentario, setComentario] = useState("");

  // ABRIR MODAL EXCLUIR
  const handleShow = (id) => {
    setIdComida(id);
    setShow(true);
  };
  // FECHAR MODAL EXCLUIR
  const handleClose = () => {
    setIdComida(null);
    setShow(false);
  };


export function Cardapio() {
    const [comidas, setComidas] = useState(null);
    const [pesquisa, setPesquisa] = useState('');
    const [comidasFiltradas, setComidasFiltradas] = useState(comidas);


    
    // INICIAR TABELA DE CARDÁPIO
    useEffect(() => {
        initializeTable();
    }, []);

    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable() {
        axios.get("http://localhost:3001/comidas")
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
        const comidasFiltradas = comidas.filter(
            (comida) => {
                return (
                    comida.codigo.toLowerCase().includes(pesquisa) ||
                    comida.nome.toLowerCase().includes(pesquisa) ||
                    comida.categoria.toLowerCase().includes(pesquisa) ||
                    comida.descricao.toLowerCase().includes(pesquisa)
                );
            }
        );
        setPesquisa(pesquisa);
        setComidasFiltradas(comidasFiltradas);
    }

    function handleUpdateData() {
        initializeTable();
    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="cardapio-titulo">Cardápio</h1>
                    <Form>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar nome ou categoria"
                                aria-label="Pesquisar nome ou categoria"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
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

  // ABRIR MODAL DETALHES
  const handleshowDetalhe = (id) => {
    setIdComida(id);
    detalheComida(id);
    setShowDetalhe(true);
  };
  // FECHAR MODAL DETALHES
  const handleClose2 = () => {
    setIdComida(null);
    setShowDetalhe(false);
  };

  // INICIAR TABELA DE CARDÁPIO
  useEffect(() => {
    initializeTable();
  }, []);

  // FUNÇÃO INICIAR TABELA DE CARDÁPIO
  function initializeTable() {
    axios
      .get("http://localhost:3001/comidas")
      .then((response) => {
        setComidas(response.data);
        setComidasFiltradas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // FUNÇÃO PESQUISAR POR NOME, CATEGORIA E DESCRIÇÃO
  const handlePesquisa = (event) => {
    const pesquisa = event.target.value.toLowerCase();
    const comidasFiltradas = comidas.filter((comida) => {
      return (
        comida.nome.toLowerCase().includes(pesquisa) ||
        comida.categoria.toLowerCase().includes(pesquisa) ||
        comida.descricao.toLowerCase().includes(pesquisa)
      );
    });
    setPesquisa(pesquisa);
    setComidasFiltradas(comidasFiltradas);
  };

  // FUNÇÃO DELETAR COMIDA
  function onDelete() {
    axios
      .delete(`http://localhost:3001/comidas/${idComida}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

  // FUNÇÃO DETALHE COMIDA
  function detalheComida(id) {
    axios
      .get(`http://localhost:3001/comidas/${id}`)
      .then((response) => {
        setComidaSelecionada(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


    //Jogar depois para a listagem de pedidos

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
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="cardapio-titulo">Cardápio</h1>
                    <Form>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar nome ou categoria"
                                aria-label="Pesquisar nome ou categoria"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
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
};
