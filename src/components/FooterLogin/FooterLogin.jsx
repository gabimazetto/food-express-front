import "./FooterLogin.css"
import logo from "../../assets/images/TemaEscuro.png"
import { Link } from "react-router-dom"

export function FooterLogin() {
    return (
        <>
            <footer className=" footer py-2">
                <div className="divImg">
                    <img src={logo} alt="logo" className="me-3" />
                </div>
                <div className="divGeral">
                    <div className="div1">
                        <h3 className="ms-4">
                            Os melhores <br /> restaurantes na <br /> sua casa
                        </h3>
                    </div>
                    <div className="div2 mt-2 ms-2">
                        <Link to="/" className="link" ><p>Home</p> </Link>
                        <Link to="" className="link" ><p>Sobre nós</p> </Link>
                        <Link to="" className="link" ><p>Perguntas frequentes</p> </Link>
                        <Link to="" className="link" ><p>Termos e política de privacidade</p> </Link>
                    </div>
                    <div className="div3">
                        <h3>
                            Contato
                        </h3>
                        <p>
                            Rua: Rio de Janeiro, 01 Niterói - RJ
                        </p>
                        <hr className="me-3"></hr>
                        <p>
                            contato@foodexpress.com
                        </p>
                        <p>
                            +55 21 9999-9999
                        </p>
                    </div>
                </div>
                <div className="divGeral2">
                    <hr className="hr1 ms-3 me-3"></hr>
                    <p className="p1 ms-3">Copyrigth © 2023. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    )
};