import "./NotFound.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";



export function NotFound() {
    return(
        <>
                    <div className="container-principal-NotFound centered-container-secundarias">
                    <h1 className="tituloPrincipalNotFound">404 - Not Found</h1>
                <main className="border-secundaria container rounded-5 ">
                    <div className="grid" >
                        <div className="colOne imagem-NotFound">
                            <div className="conteudo-NotFound">
                            <h1 className="sub-NotFound">Página não encontrada</h1>
                                <p>Desculpe, a página que você está procurando não foi encontrada.</p>

                                    <div className="botaoNotFound">
                                        <Button as={Link} to="/" variant="primary">
                                            Página Inicial
                                        </Button>
                                        <Button as={Link} to="/cliente/login" variant="secondary">
                                            Login
                                        </Button>
                                    </div>
                                    

                                </div>
                            </div>
                        </div>
                </main>
            </div>
        </>
    );
}