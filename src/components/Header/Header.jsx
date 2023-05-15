import { Link } from "react-router-dom";
import logoLogadoImg from "../../assets/images/LogoMini.png";
import logoDeslogadoWhiteImg from "../../assets/images/TemaClaro.png";
import logoDeslogadoDarkImg from "../../assets/images/TemaEscuro.png";
import "./style.css";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";


export function Header() {

    //tudo aqui para baixo até o próximo comentário é experimental
    //para testar o tema dark, contexto logado e o contexto de Cliente/Restaurante
    const [temaEscuro, setTemaEscuro] = useState(false);
    const [estaLogado, setEstaLogado] = useState(false);
    const [clienteLogado, setClienteLogado] = useState(false);
    const [restauranteLogado, setRestauranteLogado] = useState(false);

    const [telaPequena, setTelaPequena] = useState(false);
    const [telaMedia, setTelaMedia] = useState(false);
    const [telaGrande, setTelaGrande] = useState(false);
    const [telaGigante, setTelaGigante] = useState(false);

    function trocaTema() {
        if (temaEscuro === false) {
            setTemaEscuro(true);
        } else {
            setTemaEscuro(false);
        }
    }
    function logarApp() {
        if (estaLogado === false) {
            setEstaLogado(true);
        } else {
            setEstaLogado(false);
        }
    }
    function clienteLogar() {
        if (clienteLogado === false) {
            setClienteLogado(true);
        } else {
            setClienteLogado(false);
        }
    }
    function restauranteLogar() {
        if (restauranteLogado === false) {
            setRestauranteLogado(true);
        } else {
            setRestauranteLogado(false);
        }
    }
    // fim da parte experimental

    useEffect(() => {
        function verificaTamanhoTela() {
            setTelaPequena(window.innerWidth < 480);
            setTelaMedia(window.innerWidth >= 480 && window.innerWidth < 768);
            setTelaGrande(window.innerWidth >= 768 && window.innerWidth < 992);
            setTelaGigante(window.innerWidth >= 992);
        }
        window.addEventListener('resize', verificaTamanhoTela);
        verificaTamanhoTela();

        return () => {
            window.removeEventListener('resize', verificaTamanhoTela);
        }
    }, []);



    return (
        <Navbar bg={temaEscuro === false ? "light" : "dark"} expand="lg" className="">
            <Container fluid className="container d-flex justify-content-between align-items-center" >
                <Navbar.Brand >
                    {/* Verifica se está logado para apresentar as informações */}
                    {estaLogado === false ? (
                        //verifica qual tema está sendo aplicado para mostrar a melhor logo
                        temaEscuro === false ? (
                            <Link to="/">
                                <img src={logoDeslogadoWhiteImg} width={"100%"} alt="Logo Food Express" />
                            </Link>
                        ) : (
                            <Link to="/">
                                <img src={logoDeslogadoDarkImg} width={"100%"} alt="Logo Food Express" />
                            </Link>
                        )
                    ) : (
                        // Se caso estiver logado aí verifica o tamanho da logo, se for para tamanhos de tela até grande
                        // mostra a logo compacta
                        telaPequena || telaMedia || telaGrande ? (
                            <Link to="/">
                                <img className="logo-logado" src={logoLogadoImg} alt="Logo Food Express" />
                            </Link>
                        ) : (
                            // Se tiver bastante espaço na tela mostra a logo completa dependendo do tema do usuário
                            telaGigante && temaEscuro === false ? (
                                <Link to="/">
                                    <img className="logo-logado" src={logoDeslogadoWhiteImg} alt="Logo Food Express" />
                                </Link>
                            ) : (
                                <Link to="/">
                                    <img className="logo-logado" src={logoDeslogadoDarkImg} alt="Logo Food Express" />
                                </Link>
                            )
                        )

                    )}
                </Navbar.Brand>
                {estaLogado === false ? (
                    <></>
                ) : (
                <>
                    <Navbar.Toggle className="navbar-primary bg-primary" aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        className={temaEscuro === false ? "bg-light" : "bg-dark"}
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="end"
                    >
                        <Offcanvas.Header className="justify-content-end" closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                { telaPequena || telaMedia || telaGrande ? (
                                    <>
                                        <Nav.Link href="#action1" className="d-flex"><i className="bi bi-person-circle text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Perfil</p></Nav.Link>
                                        <Nav.Link href="#action2" className="d-flex"><i className="bi bi-file-text-fill text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Pedidos</p></Nav.Link>
                                        {restauranteLogado === true || clienteLogado === false ? (
                                            <Nav.Link href="#action3" className="d-flex"><i class="bi bi-building-fill-gear text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Editar informações de Empresa</p></Nav.Link>
                                        ) : (
                                            <Nav.Link href="#action3" className="d-flex"><i className="bi bi-heart text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Favoritos</p></Nav.Link>
                                        )}
                                        <Nav.Link href="#action4" className="d-flex"><i className="bi bi-telephone-fill text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Fale Conosco</p></Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link href="#action1"><Button variant="primary"><i className={temaEscuro === false ? "bi bi-person-circle text-light icones-atalho-grandes" : "bi bi-person-circle text-dark icones-atalho-grandes"}></i></Button></Nav.Link>
                                        <Nav.Link href="#action2"><Button variant="primary"><i className={temaEscuro === false ? "bi bi-file-text-fill text-light icones-atalho-grandes" : "bi bi-file-text-fill text-dark icones-atalho-grandes"}></i></Button></Nav.Link>
                                        {restauranteLogado === true || clienteLogado === false ? (
                                            <Nav.Link href="#action3" className="d-flex"><Button variant="primary" ><i className={temaEscuro === false ? "bi bi-building-fill-gear text-light icones-atalho-grandes" : "bi bi-building-fill-gear text-dark icones-atalho-grandes"}></i></Button></Nav.Link>
                                        ) : (
                                            <Nav.Link href="#action3"><Button variant="primary"><i className={temaEscuro === false ? "bi bi-heart text-light icones-atalho-grandes" : "bi bi-heart text-dark icones-atalho-grandes"}></i></Button></Nav.Link>
                                        )}
                                        <Nav.Link href="#action4"><Button variant="primary"><i className={temaEscuro === false ? "bi bi-telephone-fill text-light icones-atalho-grandes" : "bi bi-telephone-fill text-dark icones-atalho-grandes"}></i></Button></Nav.Link>
                                    </>
                                )} 
                                
                                {/* <button onClick={() => trocaTema()}>Trocar Tema</button>
                                <button onClick={() => logarApp()}>Logar App</button>
                                <button onClick={() => clienteLogar()}>Logar Como Cliente</button>
                                <button onClick={() => restauranteLogar()}>Logar Como Restaurante</button> */}

                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    {/* Posso deletar provavelmente */}
                    {/* <div className="">
                            <Nav.Link href="#action1"><i className="bi bi-person-circle text-primary iconesGrandes"></i><p className="textos-icones">Perfil</p></Nav.Link>
                            <Nav.Link href="#action2"><i className="bi bi-file-text-fill text-primary iconesGrandes"></i><p className="textos-icones">Pedidos</p></Nav.Link>
                            {/* Esse link para Favoritos só deve aparecer quando for um Cliente logado */}{/*
                            { restauranteLogado === true || clienteLogado === false ? (
                                <></>
                            ) : (
                                <Nav.Link href="#action3"><i className="bi bi-heart text-primary iconesGrandes"></i><p className="textos-icones">Favoritos</p></Nav.Link>
                            )}
                            <Nav.Link href="#action4"><i className="bi bi-telephone-fill text-primary iconesGrandes"></i><p className="textos-icones">Fale Conosco</p></Nav.Link>
                            </div> */}
                </>
                )}
            </Container>
            {/* DEBUG DIV */}
            {/* <span bg={ temaEscuro === false ? "light" : "dark"} className={ temaEscuro === false ? "text-secondary" : "text-primary"}>
                {`TemaEscuro: ${temaEscuro},`}<br/>
                {`Logado: ${estaLogado},`}<br/>
                {`ClienteLogado: ${clienteLogado},`}<br/>
                {`RestauranteLogado: ${restauranteLogado}`}
            </span> */}
        </Navbar>
    )
}