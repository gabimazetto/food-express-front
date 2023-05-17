import { FooterLogout } from "../../components/FooterLogout/FooterLogout";
import noteFood from "../../assets/images/noteFood.png"
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export function NotFound() {
    return(
        <>
    
            <main>
        <div className="container text-center mt-3">
            <h1>404 - Página não encontrada</h1>
            <p>Desculpe, a página que você está procurando não foi encontrada.</p>
            <img src={noteFood} alt="" /> <br />
            
            <ButtonGroup className="mt-1 mb-5">
                <Button as={Link} to="/" variant="primary">
                    Página Inicial
                </Button>
                <Button as={Link} to="/cliente/login" variant="secondary">
                    Login
                </Button>
            </ButtonGroup>
        </div>    
        </main>    
        <footer>
            <FooterLogout />
        </footer>
        </>
    );
}