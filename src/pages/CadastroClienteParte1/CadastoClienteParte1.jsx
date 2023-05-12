import axios from "axios";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  InputGroup,
  Container,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import signinIcon from "../../assets/icons/negocioCheck.svg";
import foodExpressLogo from "../../assets/images/1-removebg-preview 1.png";

export function CadastroClienteParte1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/clientes", data)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Container fluid id="background-gradient" className=" pt-3 vh-100">
        <Card className="d-flex container mt-5 w-75 align-items-center rounded-5  ">
          <Card.Body>
            <Row>
              <Col>
                <Container>
                  <Card.Img width="auto" src={foodExpressLogo}></Card.Img>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="d-flex mb-3" controlId="email">
                      <InputGroup className="">
                        <Form.Control
                          type="email"
                          className={
                            "bg-input" || (errors.email && "is-invalid")
                          }
                          placeholder="Informe seu e-mail"
                          {...register("email", {
                            required: "O email é obrigatório",
                          })}
                        />
                        <InputGroup.Text className="rounded-2 text-white bg-primary">
                          <i class="bi bi-envelope"></i>
                        </InputGroup.Text>

                        <Form.Text className="invalid-feedback">
                          {errors.email?.message}
                        </Form.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="d-flex mb-3" controlId="password">
                      <InputGroup>
                        <Form.Control
                          type="password"
                          className={
                            "bg-input" || (errors.senha && "is-invalid")
                          }
                          placeholder="Crie sua senha"
                          {...register("senha", {
                            required: "A senha é obrigatória",
                          })}
                        />
                        <InputGroup.Text className="rounded-2 text-white bg-primary">
                          <i class="bi bi-lock"></i>
                        </InputGroup.Text>
                        <Form.Text className="invalid-feedback">
                          {errors.senha?.message}
                        </Form.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="d-flex mb-3" controlId="password">
                      <InputGroup>
                        <Form.Control
                          type="password"
                          className={
                            "bg-input" ||
                            (errors.senha && "bg-input is-invalid")
                          }
                          placeholder="Confirme sua senha"
                          {...register("confirmacaoSenha", {
                            required: "As senhas devem ser iguais",
                            validate: (value) =>
                              value === getValues("senha") ||
                              "As senhas devem ser iguais",
                          })}
                        />
                        <InputGroup.Text className="rounded-2 text-white bg-primary">
                          <i class="bi bi-lock"></i>
                        </InputGroup.Text>
                        <Form.Text className="invalid-feedback">
                          {errors.confirmacaoSenha?.message}
                        </Form.Text>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-center p-2 gap-2">
                      <Button
                        variant="primary"
                        className="text-white"
                        type="submit"
                        size="lg"
                      >
                        Cadastrar
                      </Button>
                    </div>
                    <div className="d-flex  justify-content-center ">OU</div>
                    <div className="d-flex mt-3 justify-content-center ">
                      <Button variant="outline-primary" type="submit" size="lg">
                        Ir para Login
                      </Button>
                    </div>
                  </Form>
                </Container>
              </Col>
              <Col className=" rounded-5 ">
                <Card.Img className=" bg-primary" src={signinIcon}></Card.Img>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      {/* background: linear-gradient(34deg, rgba(66,66,66,1) 0%, rgba(240,96,0,1) 0%, rgba(255,249,237,1) 100%); */}
    </>
  );
}
