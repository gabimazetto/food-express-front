import { Button } from "react-bootstrap"
import imagemLogo from "../../assets/icons/prato.svg"
import "./HomeRestaurante.css"
import { CardCardapioRestaurante } from "../../components/CardCardapioRestaurante/CardCardapioRestaurante"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

export function HomeRestaurante() {
    const [comidas, setComidas] = useState([]);


    // INICIAR TABELA DE CARDÁPIO
    useEffect(() => {
        initializeTable();
    }, []);

    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable() {
        axios.get(`http://localhost:3001/comidas`)
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
        <div className="container-home-restaurante">
            <header className="header-home-restaurante ">
                <div className="container-header">
                    <div className="titulo-home-restaurante">
                        <h1>Cardápio</h1>
                        <div className="button-header invisivel-mobile ">
                            <Button as={Link} to="/restaurante/id/cardapio" className="button-meus-itens" variant="primary">Meus itens</Button>
                            <Button as={Link} to="/restaurante/cardapio/cadastro" className="button-add-itens" variant="primary">Adicionar novo item</Button>
                        </div>
                    </div>
                    <div className="imagem-home-restaurante">
                        <img src={imagemLogo} alt="" />
                    </div>
                </div>
                <div className="invisivel-desktop button-home-restaurante">
                    <Button  as={Link} to="/restaurante/cardapio/cadastro" className="button-header" variant="primary">Adicionar refeição</Button>
                </div>
            </header>
            <CardCardapioRestaurante
                comidas={comidas}
                updateData={handleUpdateData}
                className={"invisivel-desktop"} />
        </div>
    )
}