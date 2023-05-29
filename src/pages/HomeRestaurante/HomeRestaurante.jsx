import { Button, Container } from "react-bootstrap"
import imagemLogo from "../../assets/images/cardapio2.png"
import "./HomeRestaurante.css"
import { CardCardapioRestaurante } from "../../components/CardCardapioRestaurante/CardCardapioRestaurante"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { ContextRestaurant } from "../../contexts/RestaurantContext"
import { Loader } from "../../components/Loader/Loader"
import { ContextLogin } from "../../contexts/LoginContext"

export function HomeRestaurante() {
    const [comidas, setComidas] = useState([]);
    const { idRes } = useContext(ContextRestaurant);
    const { config } = useContext(ContextLogin);


    // INICIAR TABELA DE CARDÁPIO
    useEffect(() => {
        // setIdRest(idRes)
        initializeTable();
    }, [idRes]);

    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable() {
        axios.get(`http://localhost:3001/restaurantes/${idRes}/cardapio/`, config)
            .then((response) => {
                setComidas(response.data)
            })
            .catch((error) => {
                toast.error("Erro ao carregar dados.");
            });
    }

    function handleUpdateData() {
        initializeTable();
    }

    return (

<div className="container-home-restaurante ">
            <header className="header-home-restaurante ">
                <div className="container-header ">
                    <div className="titulo-home-restaurante text-center">
                        <h1 className="">Cardápio</h1>
                        <div className="button-header">
                            <div className="botao-1">
                            <Button as={Link} to="/restaurante/cardapio/" className="button-meus-itens" variant="primary">Meus itens</Button>
                            </div>
                            <div className="botao-2">
                            <Button as={Link} to="/restaurante/cardapio/cadastro" className="button-add-itens" variant="primary">Adicionar novo</Button>
                            </div>
                        </div>
                    </div>
                    <div className="imagem-home-restaurante">
                        <img src={imagemLogo} alt="" />
                    </div>
                </div>

            </header>
            {idRes === null ? (
                <Loader />
            ) : (
                <CardCardapioRestaurante
                    comidas={comidas}
                    updateData={handleUpdateData}
                    className={"invisivel-desktop"} />
            )}

        </div>

    )
}