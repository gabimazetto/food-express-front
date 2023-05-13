import "./CardCardapioRestaurante.css"
import imagemComida1 from "../../assets/images/2.png"
import { useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Loader } from "../../components/Loader/Loader";



export function CardCardapioRestaurante() {
    // const { id } = useParams();
    const [cardapio, setCardapio] = useState([])

    useEffect(() => {
        initializeTable();
    }, []);


    function initializeTable() {
        axios.get(`http://localhost:3001/comidas`)
            .then((response) => {
                setCardapio(response.data)
                console.log(cardapio)
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }

    return (
        <main className="main-home-restaurante invisivel-desktop  d-flex flex-column align-items-center">
            {cardapio === null ? (
                <Loader />
            ) : (
                cardapio.map((comida) => {
                    return (
                        <article className="article-home-restaurante invisivel-desktop" key={comida.id}>
                            <div className="header-cards-restaurante">
                                <img src={comida.imagem} alt="" />
                            </div>
                            <div className="article-body">
                                <div className="titulo-card-restaurante d-flex justify-content-between">
                                    <h1 className=" d-flex">{comida.nome}</h1>
                                    <i className="bi bi-pencil-fill  d-flex align-items-center" ></i>
                                </div>
                                <p>{comida.descricao}</p>
                                <div className="preco-card-restaurante">
                                    <h1 className=" d-flex align-items-center">R$ {comida.preco}</h1>
                                    <i className="bi bi-trash3"></i>
                                </div>
                            </div>
                        </article>
                    )
                })
            )}
        </main>
    )
}