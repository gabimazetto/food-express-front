
import {Button,ButtonGroup,Form, InputGroup,} from "react-bootstrap";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import noteFood from "../../assets/images/noteFood.png";
import { FooterLogout } from "../../components/FooterLogout/FooterLogout";
import { Link } from "react-router-dom";

export function NotFound() {


    return (
        <>
            <ContainerCenterMobile className="background-gradient">
                <main className="border container rounded-5 ">
                    <div className="grid" >
                        <div className="colTwo" >
                            <div className="text-center">
                                <img
                                    src={noteFood}
                                    class="mt-4 "
                                    alt="Imagem de uma mulher confusa"
                                />
                            </div>
                        </div>
                        <div className="colOne">
                            <div className="px-3 py-4">
                                <h1>404 - Página não encontrada</h1>
            <p>Desculpe, a página que você está procurando não foi encontrada.</p>
            
            <ButtonGroup className="mt-1 mb-5">
                <Button as={Link} to="/" variant="primary">
                    Página Inicial
                </Button>
                <Button as={Link} to="/cliente/login" variant="secondary">
                    Login
                </Button>
            </ButtonGroup>
                                    
                                </div>
                            </div>
                        </div>
                </main>
            </ContainerCenterMobile>
            <FooterLogout/>
        </>
    );
}