import "../Footer/Footer.css"
import logo from "../../assets/images/logoTemaClaro.png"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextRestaurant } from "../../contexts/RestaurantContext";


export function Footer() {

    const { roleCli } = useContext(ContextClient);
    const { roleRes } = useContext(ContextRestaurant);

    const getHomeLink = () => {
        if (roleCli === "cliente") {
            return "/cliente/home";
        } else if (roleRes === "restaurante") {
            return "/restaurante/home";
        } else {
            return "/";
        }
    };


    return (
        <footer className="text-center text-lg-start text-md-start text-primary-color mt-0 mb-0 my-app-footer pt-1">
            <section className="container-footer">
                <Col  >
                    <Link to="/" className="linkApp">
                        <img src={logo} alt="logo" className="logo-footer me-3" />
                    </Link>
                    <h3 className="text-center text-md-start mt-5">
                        Os melhores restaurantes na sua casa!
                    </h3>
                </Col>
                <Col className="col-one-footer" >
                    <div>
                        <Link to={getHomeLink()} className="link-footer" ><p>Home</p> </Link>
                    </div>
                    <div>
                        <Link to="/sobre" className="link-footer" ><p>Sobre nós</p> </Link>
                    </div>
                    <div>
                        <Link to="/faq" className="link-footer" ><p>FAQ</p> </Link>
                    </div>
                    <div>
                        <Link to="/privacidade" className="link-footer" ><p>Política de privacidade</p> </Link>
                    </div>
                    <div>
                        <Link to="/contato" className="link-footer" ><p>Contato</p> </Link>
                    </div>
                </Col>
                <Col  className="col-two-footer" >
                    <p>
                        <FontAwesomeIcon icon={['fas', 'home']} />
                        São Paulo, SP, BR
                    </p>
                    <p>
                        <FontAwesomeIcon icon={['fas', 'envelope']} />
                        contato@foodexpress.com
                    </p>
                    <p>
                        <FontAwesomeIcon icon={['fas', 'phone']} /> 99 99999-9999
                    </p>
                </Col>
            </section>
        
        <span className="mt-1 mb-1 footer-copy">
                {/* <div className="text-center p-1 text-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}> */}
                    {/* <Link to="https://www.facebook.com/julia.gascho" target="_blank" className="me-4 text-reset">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                    <Link to="" className="me-4 text-reset" target="_blank">
                        <FontAwesomeIcon icon={faGoogle} />
                    </Link>
                    <Link to="https://www.instagram.com/jugascho/" target="_blank" className="me-5 text-reset">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link> */}
                    
                        © 2023. Todos os direitos reservados:  {" "}
                        <Link className="fw-bold footer-site" to="/">
                         foodexpress.com
                        </Link>
                    
                {/* </div> */}
            </span>
        
        </footer>
    )
};