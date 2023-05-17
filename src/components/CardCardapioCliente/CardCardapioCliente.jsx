import "./CardCardapioCliente.css"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom"


export function CardCardapioCliente({ className }) {
    const [cardapio, setCardapio] = useState([])
    const clienteId = 1;


    useEffect(() => {
        initializeTable();
    }, []);


    function initializeTable() {
        axios.get(`http://localhost:3001/comidas`)
            .then((response) => {
                setCardapio(response.data)
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }


    function FavComida(comidaId) {
        const data = {
            favoritar: true,
            comidaId,
            clienteId,
        }
        axios.post("http://localhost:3001/comidas/favoritos", data)
        .then((response) =>{
            toast.success("Adicionado aos Favoritos", {
                position:"bottom-right", duration:2000
            });
        }).catch((error) =>{
            toast.error("Algo deu errado", {
                position: "bottom-right", duration:2000
            });
        });
    }

    return (
        <main className={`main-home-restaurante invisivel-desktop  d-flex flex-column align-items-center ${className}`}>
            <div className="container-cards">
                {cardapio === null ? (
                    <Loader />
                ) : (

                    cardapio.map((comida) => {
                        return (
                            <article className={`article-home-restaurante ${className}`} key={comida.id}>
                                <div className="header-cards-restaurante">
                                    <img src={comida.imagem} alt="" />
                                </div>
                                <div className="article-body">
                                    <div className="">
                                        <span className="d-flex zerando-margin"><b>Cod.:  </b>{comida.codigo}</span>
                                    </div>
                                    <div className="titulo-card-restaurante d-flex justify-content-around">
                                        <h1 className="d-flex zerando-margin">{comida.nome}</h1>
                                        <Link to={`/restaurante/cardapio/item/${comida.id}`}>
                                            {/* <button className="cards-botoes" style={{ cursor: 'pointer' }}>
                                                <i className="bi bi-pencil-fill d-flex align-items-center"></i>
                                            </button> */}
                                        </Link>
                                    </div>
                                    <div className="infos-card">
                                        <p className="descricao zerando-margin">{comida.descricao}</p>
                                        <p className="zerando-margin"><b>Peso (gramas):</b> {comida.peso}</p>
                                        <p className="zerando-margin"><b>Categoria: </b>{comida.categoria}</p>
                                    </div>
                                    <div className="preco-card-restaurante">
                                    <h1 className="d-flex align-items-center zerando-margin">R$ {comida.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h1>

                                        <button className="cards-botoes" onClick={() => FavComida(comida.id)} style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-heart"></i>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        )
                    })
                )}
            </div>
        </main>
    );
}