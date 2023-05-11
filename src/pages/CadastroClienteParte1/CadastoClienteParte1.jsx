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
import signinIcon from "../../assets/images/9 2.png";
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
      <Container fluid className="pt-3 vh-100 bg-warning">
        <Card className="container  w-75 rounded-5  ">
          <Card.Body>
            <Row>
              <Col>
                <Container>
                  <Card.Img src={foodExpressLogo}></Card.Img>
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

                    <div className="d-grid gap-2">
                      <Button
                        variant="warning"
                        className="text-white"
                        type="submit"
                        size="lg"
                      >
                        Cadastrar
                      </Button>
                    </div>
                  </Form>
                </Container>
              </Col>
              <Col className=" rounded-5 bg-warning">
                <Card.Img
                  variant="right"
                  className=" w-75"
                  src={signinIcon}
                ></Card.Img>
                <Container className="bg-warning"></Container>
                {/* <img width="auto" src={signinIcon} alt="Icon"></img> */}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
