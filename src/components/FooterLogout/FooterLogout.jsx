import "./FooterLogout.css"
import logo from "../../assets/images/TemaEscuro.png"

export function FooterLogout() {
    return (
        <>
            <footer className=" footer py-2">
                <div className="divGeral">
                    <div className="div1">
                        <img src={logo} alt="logo" className="ms-1"/> 
                        <h3 className= "ms-3 mt-2"> 
                            Os melhores <br/> restaurantes na <br/> sua casa
                        </h3>
                    </div>
                    <div className="div2">
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