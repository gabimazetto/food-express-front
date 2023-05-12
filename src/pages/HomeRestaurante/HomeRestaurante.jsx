import { Button } from "react-bootstrap"
import imagemLogo from "../../assets/icons/prato.svg"
import "./HomeRestaurante.css"
import { CardCardapioRestaurante } from "../../components/CardCardapioRestaurante/CardCardapioRestaurante"

export function HomeRestaurante() {


    return (
            <div className="container-home-restaurante">
                <header className="header-home-restaurante ">
                    <div className="container-header">
                        <div className="titulo-home-restaurante">
                            <h1>Cardápio</h1>
                            <div className="button-header invisivel-mobile ">
                                <Button className="button-meus-itens" variant="warning">Meus itens</Button>
                                <Button className="button-add-itens" variant="warning">Adicionar novo item</Button>
                            </div>
                        </div>
                        <div className="imagem-home-restaurante">
                            <img src={imagemLogo} alt="" />
                        </div>
                    </div>
                    <div className="invisivel-desktop button-home-restaurante">
                        <Button className="button-header" variant="warning">Adicionar refeição</Button>
                    </div>
                </header>
                <CardCardapioRestaurante />
            </div>
    )
}