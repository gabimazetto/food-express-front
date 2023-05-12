import { Button } from "react-bootstrap";
import imgMulherNotebook from "../../assets/icons/Design sem nome 1.svg";
import imgRestaurante from "../../assets/icons/Design sem nome56 1.svg";
import { Link } from "react-router-dom";


export function Home() {
  return (
    <div className="container text-center mt-3 mb-3">
      <div className="row align-items-center">
        <div className="col-sm-6">
          {/* primeira imagem */}
          <div className="image-container flex-column justify-content-center align-items-center">
            <img  className="w-50 mt-3 h-100" src={imgMulherNotebook} alt="" />
            <div className="d-flex mt-3 justify-content-center">
              <div className="d-flex flex-column justify-content-center align-items-center m-3">
                <div>
                  <p>Já é nosso cliente?<br /> Faça seu Login</p>
                </div>
                <Button as={Link} to="/login" className="text-light" variant="primary">
                  Login
                </Button>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center m-3">
                <div>
                  <p>Ainda não é nosso cliente?<br /> Faça seu cadastro</p>
                </div>
                <Button as={Link} to="/Cadastro" className="text-light" variant="primary">
                  Cadastro
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          {/* segunda imagem */}
          <div className="image-container flex-column justify-content-center align-items-center">
            <img className="w-50 mt-3 h-100" src={imgRestaurante} alt="" />
            <div className="d-flex mt-3 justify-content-center">
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <div>
                  <p>Já é nosso parceiro?<br /> Faça seu login</p>
                </div>
                <Button as={Link} to="/login" className="text-light" variant="primary">
                  Login
                </Button>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center m-3">
                <div>
                  <p>Ainda não é um parceiro?<br /> Faça seu cadastro</p>
                </div>
                <Button as={Link} to="/Cadastro" className="text-light" variant="primary">
                  Cadastro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
