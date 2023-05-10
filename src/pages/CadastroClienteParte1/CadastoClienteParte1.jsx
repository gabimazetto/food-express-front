import axios from "axios";
import { Button, Card, Col, Form, Row, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import signinIcon from "../../assets/icons/9.svg";

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
      <div className="container card-login">
        <Row className="d-flex justify-content-center align-items-center">
          <Col className="md-12 xl-4">
            <Card className="p-5">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className={errors.email && "is-invalid"}
                    placeholder="Seu email"
                    {...register("email", {
                      required: "O email é obrigatório",
                    })}
                  />

                  <Form.Text className="invalid-feedback">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      className={errors.senha && "is-invalid"}
                      placeholder="Sua senha"
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
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Confirme sua senha</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      className={errors.senha && "is-invalid"}
                      placeholder="Sua senha"
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
                <div className="d-flex justify-content-right align-items-right">
                  <img src={signinIcon} alt="vala"></img>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <Button className="w-25" type="submit" variant="success">
                    Cadastrar
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
