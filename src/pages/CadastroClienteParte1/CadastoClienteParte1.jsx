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
import signinIcon from "../../assets/icons/9.svg";
import foodExpressLogo from "../../assets/images/1-removebg-preview 1.png";

export function CadastroClienteParte1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      <Container fluid className="vh-100 bg-warning">
        <Card className="w-75 h-75 d-flex rounded-5 ">
          <Card.Body>
            <Row>
              <Col className="d-flex">
                <Container className="w-auto h-auto p-5 mb-3">
                  <Card.Img
                    width="393px"
                    height="110px"
                    src={foodExpressLogo}
                  ></Card.Img>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="d-flex mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        className={errors.email && "is-invalid"}
                        placeholder="Informe seu e-mail"
                        {...register("email", {
                          required: "O email é obrigatório",
                        })}
                      />

                      <Form.Text className="invalid-feedback">
                        {errors.email?.message}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="d-flex mb-3" controlId="password">
                      <InputGroup>
                        <Form.Control
                          type="password"
                          className={errors.senha && "is-invalid"}
                          placeholder="Crie sua senha"
                          {...register("senha", {
                            required: "A senha é obrigatória",
                          })}
                        />
                        <InputGroup.Text>
                          <i class={"bi bi-eye-fill"}></i>
                        </InputGroup.Text>
                        <Form.Text className="invalid-feedback">
                          {errors.senha?.message}
                        </Form.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className=" d-flex mb-3" controlId="password">
                      <InputGroup>
                        <Form.Control
                          type="password"
                          className={errors.senha && "is-invalid"}
                          placeholder="Confirme sua senha"
                          {...register("senha", {
                            required: "As senhas são diferentes",
                          })}
                        />
                        <InputGroup.Text>
                          <i class={"bi bi-eye-fill"}></i>
                        </InputGroup.Text>
                        <Form.Text className="invalid-feedback">
                          {errors.senha?.message}
                        </Form.Text>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-grid gap-2" color="#fd7e14">
                      <Button variant="warning" type="submit" size="lg">
                        Cadastrar
                      </Button>
                    </div>
                  </Form>
                </Container>
              </Col>
              <Col>
                <Card.Img
                  variant="right"
                  className="d-flex w-75"
                  src={signinIcon}
                ></Card.Img>
                {/* <img width="auto" src={signinIcon} alt="Icon"></img> */}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
