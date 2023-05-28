import { Link, useLocation, useNavigate } from "react-router-dom";
import logoLogadoImg from "../../assets/images/LogoMini.png";
import logoDeslogadoWhiteImg from "../../assets/images/TemaClaro.png";
import logoDeslogadoDarkImg from "../../assets/images/TemaEscuro.png";
import "./style.css";
import { Button, Container, Nav, Navbar, Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { ContextLogin } from "../../contexts/LoginContext";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { CarrinhoCompras } from "../CarrinhoCompras/CarrinhoCompras";




export function Header() {

    const { authenticated } = useContext(ContextLogin);
    const { idCli, roleCli, LogoffClient } = useContext(ContextClient);
    const { idRes, roleRes, LogoffRestaurant } = useContext(ContextRestaurant);
    const navigate = useNavigate();
    const location = useLocation();

    
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const [telaPequena, setTelaPequena] = useState(false);
    const [telaMedia, setTelaMedia] = useState(false);
    const [telaGrande, setTelaGrande] = useState(false);
    const [telaGigante, setTelaGigante] = useState(false);

    function handleCloseOffcanvas(){
        setShowOffcanvas(false);
    }

    function handleToggleOffcanvas(){
        setShowOffcanvas(!showOffcanvas);
    }

    function Deslogar() {
        if (authenticated) {
            if (roleCli) {
                LogoffClient();
                navigate("/");
            } else if (roleRes) {
                LogoffRestaurant();
                navigate("/");
            }
        }
    }

    function handleCloseOffcanvasLogoff(){
        setShowOffcanvas(false);
        setTimeout(() => {
            Deslogar();
        }, 500);
        
    }

    const [temaEscuro, setTemaEscuro] = useState(false);
    function trocaTema() {
        if (temaEscuro === false) {
            setTemaEscuro(true);
        } else {
            setTemaEscuro(false);
        }
    }


    useEffect(() => {
        function verificaTamanhoTela() {
            setTelaPequena(window.innerWidth < 480);
            setTelaMedia(window.innerWidth >= 480 && window.innerWidth < 768);
            setTelaGrande(window.innerWidth >= 768 && window.innerWidth < 992);
            setTelaGigante(window.innerWidth >= 992);
        }
        window.addEventListener('resize', verificaTamanhoTela);
        verificaTamanhoTela();
        if(telaGigante){
            setShowOffcanvas(false);
        }
        return () => {
            window.removeEventListener('resize', verificaTamanhoTela);
        }
    }, [window.innerWidth]);



    return (
        <>
            {location.pathname !== "/cliente/login" && location.pathname !== "/cliente/cadastro" && location.pathname !== "/restaurante/cadastro" && location.pathname !== "/restaurante/login" && (
                <Navbar bg={temaEscuro === false ? "light" : "dark"} expand="lg" className="container-navbar">
                    <Container fluid className=" d-flex justify-content-between align-items-center " >
                         <Navbar.Brand>
                            {/* Verifica se está logado para apresentar as informações */}
                            {authenticated === false ? (
                                //verifica qual tema está sendo aplicado para mostrar a melhor logo
                                temaEscuro === false ? (
                                    <OverlayTrigger
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`} style={{ backgroundColor: "#f8a80c" }}>
                                                Voltar para a home
                                            </Tooltip>
                                        }
                                    >
                                        <Link to="/">
                                            <img src={logoDeslogadoWhiteImg} width={"100%"} alt="Logo Food Express"   style={{ maxWidth: "260px"}}    />
                                        </Link>
                                    </OverlayTrigger>
                                ) : (
                                    <OverlayTrigger
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`} style={{ backgroundColor: "#f8a80c" }}>
                                                Voltar para a home
                                            </Tooltip>
                                        }
                                    >
                                        <Link to="/">
                                            <img src={logoDeslogadoDarkImg} width={"100%"} alt="Logo Food Express" style={{ maxWidth: "260px"}}/>
                                        </Link>
                                    </OverlayTrigger>
                                )
                            ) : (
                                // Se caso estiver logado aí verifica o tamanho da logo, se for para tamanhos de tela até grande
                                // mostra a logo compacta
                                telaPequena || telaMedia || telaGrande ? (
                                    <OverlayTrigger
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`} variant="warning">
                                                Voltar para a home
                                            </Tooltip>
                                        }
                                    >
                                        <Link to={authenticated === true && roleCli === "cliente" ? `/cliente/home` : (authenticated === true && roleRes === "restaurante" ? `/restaurante/home` : "/")}>
                                            <img className="logo-logado" src={logoLogadoImg} alt="Logo Food Express" />
                                        </Link>
                                    </OverlayTrigger>
                                ) : (
                                    // Se tiver bastante espaço na tela mostra a logo completa dependendo do tema do usuário
                                    telaGigante && temaEscuro === false ? (
                                        <OverlayTrigger
                                            key='bottom'
                                            placement='bottom'
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    Voltar para a home
                                                </Tooltip>
                                            }
                                        >
                                            <Link to={authenticated === true && roleCli === "cliente" ? `/cliente/home` : (authenticated === true && roleRes === "restaurante" ? `/restaurante/home` : "/")}>
                                                <img className="logo-logado" src={logoDeslogadoWhiteImg} alt="Logo Food Express" style={{ maxWidth: "260px"}} />
                                            </Link>
                                        </OverlayTrigger>
                                    ) : (
                                        <OverlayTrigger
                                            key='bottom'
                                            placement='bottom'
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    Voltar para a home
                                                </Tooltip>
                                            }
                                        >
                                            <Link to={authenticated === true && roleCli === "cliente" ? `/cliente/home` : (authenticated === true && roleRes === "restaurante" ? `/restaurante/home` : "/")}>
                                                <img className="logo-logado" src={logoDeslogadoDarkImg} alt="Logo Food Express" style={{ maxWidth: "260px"}}/>
                                            </Link>
                                        </OverlayTrigger>
                                    )
                                )
                            )}
                        </Navbar.Brand>

                        {authenticated === false ? (
                            <></>
                        ) : (
                            <>
                            {/* {location.pathname !== "/cliente/pesquisa/" && location.pathname !== "/cliente/listar/restaurantes" ? (<></>): (<CarrinhoCompras />) } */}
                                
                                <Navbar.Toggle onClick={handleToggleOffcanvas} className="navbar-primary bg-primary" aria-controls={`offcanvasNavbar-expand-lg`} />
                                <Navbar.Offcanvas 
                                    show={showOffcanvas}
                                    onHide={handleCloseOffcanvas}
                                    className={temaEscuro === false ? "bg-light" : "bg-dark"}
                                    id={`offcanvasNavbar-expand-lg`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                                    placement="end"
                                >
                                    <Offcanvas.Header className="justify-content-end" closeButton>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            {telaPequena || telaMedia || telaGrande ? (
                                                <>
                                                    {authenticated === true && roleCli === "cliente" ? <Nav.Link as={Link} onClick={handleCloseOffcanvas} to={`/cliente/perfil/${idCli}`} className="d-flex"><i className="bi bi-person-circle text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Perfil</p></Nav.Link> : <></>}
                                                    <Nav.Link as={Link} onClick={handleCloseOffcanvas} to={authenticated === true && roleCli === "cliente" ? `/cliente/pedidos` : (authenticated === true && roleRes === "restaurante" ? `/restaurante/pedidos` : null)} className="d-flex"><i className="bi bi-file-text-fill text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Pedidos</p></Nav.Link>
                                                    {authenticated === true && roleRes === "restaurante" ? (
                                                        <Nav.Link as={Link} onClick={handleCloseOffcanvas} to={`/restaurante/perfil/${idRes}`} className="d-flex"><i class="bi bi-building-fill-gear text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Editar informações de Empresa</p></Nav.Link>
                                                    ) : (
                                                        <Nav.Link as={Link} onClick={handleCloseOffcanvas} to={`/cliente/listar/favoritos`} className="d-flex"><i className="bi bi-heart text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Favoritos</p></Nav.Link>
                                                    )}
                                                    <Nav.Link as={Link} onClick={handleCloseOffcanvas} to={`/contato`} className="d-flex"><i className="bi bi-telephone-fill text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Fale Conosco</p></Nav.Link>
                                                    <Nav.Link as={Link} onClick={handleCloseOffcanvasLogoff} className="d-flex"><i className="bi bi-box-arrow-right text-primary icones-atalho"></i><p className="textos-icones align-self-center text-primary mb-0 ms-1">Sair</p></Nav.Link>
                                                </>
                                            ) : (
                                                <>
                                                    {authenticated === true && roleCli === "cliente" ?
                                                        <Nav.Link as={Link} to={`/cliente/perfil/${idCli}`} >
                                                            <Button variant="primary">
                                                                <OverlayTrigger
                                                                    key='bottom'
                                                                    placement='bottom'
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-icon-bottom`}>
                                                                            Visualizar/Editar perfil
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <i className={temaEscuro === false ? "bi bi-person-circle text-light icones-atalho-grandes" : "bi bi-person-circle text-dark icones-atalho-grandes"}></i>
                                                                </OverlayTrigger>
                                                            </Button>
                                                        </Nav.Link> : <></>}
                                                    <Nav.Link as={Link} to={authenticated === true && roleCli === "cliente" ? `/cliente/pedidos` : (authenticated === true && roleRes === "restaurante" ? `/restaurante/pedidos` : null)}>
                                                        <Button variant="primary">
                                                            <OverlayTrigger
                                                                key='bottom'
                                                                placement='bottom'
                                                                overlay={
                                                                    <Tooltip id={`tooltip-icon-bottom`}>
                                                                        Histórico de pedidos
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <i className={temaEscuro === false ? "bi bi-file-text-fill text-light icones-atalho-grandes" : "bi bi-file-text-fill text-dark icones-atalho-grandes"}></i>
                                                            </OverlayTrigger>
                                                        </Button>
                                                    </Nav.Link>
                                                    {authenticated === true && roleRes === "restaurante" ? (
                                                        <Nav.Link as={Link} to={`/restaurante/perfil/${idRes}`} className="d-flex">
                                                            <Button variant="primary" >
                                                                <OverlayTrigger
                                                                    key='bottom'
                                                                    placement='bottom'
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-icon-bottom`}>
                                                                            Visualizar/Editar perfil
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <i className={temaEscuro === false ? "bi bi-building-fill-gear text-light icones-atalho-grandes" : "bi bi-building-fill-gear text-dark icones-atalho-grandes"}>
                                                                    </i>
                                                                </OverlayTrigger>
                                                            </Button>
                                                        </Nav.Link>
                                                    ) : (
                                                        <Nav.Link as={Link} to={`/cliente/listar/favoritos`}>
                                                            <Button variant="primary">
                                                                <OverlayTrigger
                                                                    key='bottom'
                                                                    placement='bottom'
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-icon-bottom`}>
                                                                            Favoritos
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <i className={temaEscuro === false ? "bi bi-heart text-light icones-atalho-grandes" : "bi bi-heart text-dark icones-atalho-grandes"}></i>
                                                                </OverlayTrigger>
                                                            </Button>
                                                        </Nav.Link>
                                                    )}
                                                    <Nav.Link as={Link} to={`/contato`}>
                                                        <Button variant="primary">
                                                            <OverlayTrigger
                                                                key='bottom'
                                                                placement='bottom'
                                                                overlay={
                                                                    <Tooltip id={`tooltip-icon-bottom`}>
                                                                        Fale conosco
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <i className={temaEscuro === false ? "bi bi-telephone-fill text-light icones-atalho-grandes" : "bi bi-telephone-fill text-dark icones-atalho-grandes"}></i>
                                                            </OverlayTrigger>
                                                        </Button>
                                                    </Nav.Link>
                                                    <Nav.Link>
                                                        <Button variant="primary" onClick={Deslogar}>
                                                            <OverlayTrigger
                                                                key='bottom'
                                                                placement='bottom'
                                                                overlay={
                                                                    <Tooltip id={`tooltip-icon-bottom`}>
                                                                        Sair
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <i className={temaEscuro === false ? "bi bi-box-arrow-right text-light icones-atalho-grandes" : "bi bi-box-arrow-right text-dark icones-atalho-grandes"}>
                                                                </i>
                                                            </OverlayTrigger>
                                                        </Button>
                                                    </Nav.Link>
                                                </>
                                            )}
                                            {/* <button onClick={() => trocaTema()}>Trocar Tema</button> */}

                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </>
                        )}
                    </Container>
                    {/* DEBUG DIV */}
                    {/* <span bg={ temaEscuro === false ? "light" : "dark"} className={ temaEscuro === false ? "text-secondary" : "text-primary"}>
                {`TemaEscuro: ${temaEscuro},`}<br/>
                {`Logado: ${authenticated},`}<br/>
                {`ClienteLogado: ${idCli},${emailCli},${roleCli}`}<br/>
                {`RestauranteLogado: ${idRes},${emailRes},${roleRes}`}
            </span> */}
                </Navbar>
            )}
        </>


    )
}