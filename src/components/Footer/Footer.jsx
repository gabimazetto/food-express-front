import "./Footer.css"
import logo from "../../assets/images/logoTemaClaro.png"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Col, Row } from "react-bootstrap";


export function Footer() {
    return (
        <footer className="text-center text-lg-start text-md-start text-primary-color mt-0 mb-0 my-app-footer pt-1">
            <Row className="mt-5 no-border-row d-flex justify-content-center aligns-items-center">
                <Col md="3" lg="5" xl="3" className="mb-4 mx-5">
                    <Link to="/" className="linkApp">
                        <img src={logo} alt="logo" className="logo-footer me-3" />
                    </Link>
                    <h3 className="text-center text-md-start mt-5">
                        Os melhores restaurantes na sua casa!
                    </h3>
                </Col>
                <Col md="3" lg="4" xl="2" className="mb-4 mx-5">
                    <p>
                        <Link to="/" className="link-footer" ><p>Home</p> </Link>
                    </p>
                    <p>
                        <Link to="/sobre" className="link-footer" ><p>Sobre nós</p> </Link>
                    </p>
                    <p>
                        <Link to="/faq" className="link-footer" ><p>FAQ</p> </Link>
                    </p>
                    <p>
                        <Link to="/privacidade" className="link-footer" ><p>Política de privacidade</p> </Link>
                    </p>
                    <p>
                        <Link to="/contato" className="link-footer" ><p>Contato</p> </Link>
                    </p>
                </Col>
                <Col md="3" lg="4" xl="2" className="mb-md-0 mb-4 mt-4">
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
            </Row>
            <Row className="mt-0 mb-0 row-copy">
                <div className="text-center p-1 text-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    <Link to="https://www.facebook.com/julia.gascho" target="_blank" className="me-4 text-reset">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                    <Link to="" className="me-4 text-reset" target="_blank">
                        <FontAwesomeIcon icon={faGoogle} />
                    </Link>
                    <Link to="https://www.instagram.com/jugascho/" target="_blank" className="me-5 text-reset">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <div>
                        © 2023. Todos os direitos reservados: {" "}
                        <Link className="text-reset fw-bold" to="/">
                            foodexpress.com
                        </Link>
                    </div>
                </div>
            </Row>
        </footer>
    )
};