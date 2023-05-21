import { Button } from "react-bootstrap";
import imgMulherNotebook from "../../assets/icons/Design sem nome 1.svg";
import imgRestaurante from "../../assets/icons/Design sem nome56 1.svg";
import { Link } from "react-router-dom";
import { FooterLogout } from "../../components/FooterLogout/FooterLogout";
import "./Home.css";

export function Home() {
  return (
    <>
      <div className="container text-center mt-3 mb-3">
        <div className="row align-items-center justify-content-center custom-row-spacing">
          <div className="col-sm-6">
            <div className="image-container">
              <img className="w-50 mt-3 h-100" src={imgMulherNotebook} alt="" />
            </div>
            <div className="button-container">
              <Button
                variant="success"
                as={Link}
                to="/cliente/login"
                className="text-light botao-home"
              >
                Já é nosso cliente?<br /> Faça seu Login
              </Button>
              <Button
                variant="success"
                as={Link}
                to="/cliente/cadastro"
                className="text-light botao-home"
              >
                Ainda não é nosso cliente?<br /> Faça seu cadastro
              </Button>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="image-container">
              <img className="w-50 mt-3 h-100" src={imgRestaurante} alt="" />
            </div>
            <div className="button-container">
              <Button
                variant="success"
                as={Link}
                to="/restaurante/login"
                className="text-light botao-home"
              >
                Já é nosso parceiro?<br /> Faça seu login
              </Button>
              <Button
                variant="success"
                as={Link}
                to="/restaurante/cadastro"
                className="text-light botao-home"
              >
                Ainda não é um parceiro?<br /> Faça seu cadastro
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FooterLogout />
    </>
  );
}
