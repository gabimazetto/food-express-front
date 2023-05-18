import "./CardCardapioCliente.css"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom"


export function CardCardapioCliente({ className, comidas, updateData }) {
    const [cardapio, setCardapio] = useState([])
    const clienteId = 1;


    useEffect(() => {
        initializeTable();
    }, [updateData]);


    function initializeTable() {
        setCardapio(comidas)
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
        <main className={`main-card-cliente invisivel-desktop  d-flex flex-column align-items-center ${className}`}>
            <div className="container-cards-cliente">
                {cardapio === null ? (
                    <Loader />
                ) : (

                    cardapio.map((comida) => {
                        return (
                            <article className={`article-home-cliente ${className}`} key={comida.id}>
                                <div className="header-cards-cliente">
                                    <img src={comida.imagem} alt="" />
                                </div>
                                <div className="article-body-cliente">

                                    <div className="titulo-card-cliente d-flex justify-content-around">
                                        <h1 className="d-flex zerando-margin">{comida.nome}</h1>
                                        <Link to={`/restaurante/cardapio/item/${comida.id}`}>
                                            <button className="cards-botoes" >
                                                <i className="bi bi-bag-plus-fill d-flex align-items-center"></i>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="infos-card-cliente">
                                        <p className="descricao-cliente zerando-margin">{comida.descricao}</p>
                                        <p className="zerando-margin"><b>Peso (gramas):</b> {comida.peso}</p>
                                        <p className="zerando-margin"><b>Categoria: </b>{comida.categoria}</p>
                                    </div>
                                    <div className="preco-card-cliente">
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