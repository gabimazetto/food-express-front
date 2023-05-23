import { Button } from "react-bootstrap";
import imgMulherNotebook from "../../assets/images/meninoNote1.png";
import imgRestaurante from "../../assets/images/restaurante.png";
import { Link } from "react-router-dom";
import "./Home.css";

export function Home() {
  return (
    
    <div className="principal">
      <section className="section-cliente">
            <div className="cliente-img">
              <img className="cliente-img-mulher" src={imgMulherNotebook} alt="" />
            </div>
            <div className="cliente-box">
              <div className="cliente-box-login">
                <p className="cliente-box-paragrafo">
                  Já é nosso cliente?<br/> Faça seu login
                </p>
                <Button
                  variant="primary"
                  as={Link}
                  to="/cliente/login"
                  className="cliente-box-botao"
                >
                  Login
                </Button>
              </div>
              <div className="cliente-box-cadstro">
                <p className="cliente-box-paragrafo">
                  Ainda não é nosso cliente?<br/> Faça seu cadastro
                </p>
                <Button
                  variant="primary"
                  as={Link}
                  to="/cliente/cadastro"
                  className="cliente-box-botao"
                >
                  Cadastro
                </Button>
              </div>
            </div>
          </section>

          <section className="section-cliente">
            <div className="cliente-img">
              <img className="cliente-img-mulher" src={imgRestaurante} alt="" />
            </div>
            <div className="cliente-box">
              <div className="cliente-box-login">
              <p className="cliente-box-paragrafo">
                Já é nosso parceiro?
                <br /> Faça seu login
              </p>
              <Button
                variant="primary"
                as={Link}
                to="/restaurante/login"
                className="cliente-box-botao"
              >
                Login
              </Button>
            </div>
            <div className="cliente-box-cadstro">
              <p className="cliente-box-paragrafo">
                Ainda não é um parceiro? <br /> Faça seu cadastro
              </p>
              <Button
                variant="primary"
                as={Link}
                to="/restaurante/cadastro"
                className="cliente-box-botao"
              >
                Cadastro
              </Button>
              </div>
            </div>
          </section>
        </div>
      
      
    
  );
}
