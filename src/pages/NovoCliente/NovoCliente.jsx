import axios from "axios";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function NovoCliente() {
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
    <div className="container mt-2 ">
      <Card className="mt-3 mb-3" border="warning">
        <Card.Body>
          <h1 className="text-center">Cadastro</h1>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mt-2 mb-3 ">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Arnaldo Correia"
                className={errors.nome && "is-invalid"}
                {...register("nome", {
                  required: "O nome completo é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
              {errors.nome && (
                <Form.Text className="invalid-feedback">
                  {errors.nome.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="tel"
                className={errors.telefone && "is-invalid"}
                placeholder="(99)99999-9999"
                pattern="[(0-9)]{4}[0-9]{5}-[0-9]{4}|[0-9]{2}[0-9]{5}-[0-9]"
                title="(99)99999-9999 ou 1212345-1234"
                {...register("telefone", {
                  required: "O telefone é obrigatório.",
                  maxLength: { value: 14, message: "Limite de 14 caracteres." },
                })}
              />
              {errors.telefone && (
                <Form.Text className="invalid-feedback">
                  {errors.telefone.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                className={errors.cpf && "is-invalid"}
                placeholder="999.999.999-99"
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}|[0-9]{9}-[0-9]{2}"
                title="Formato: 123.456.789-12 ou 123456789-12"
                {...register("cpf", {
                  required: "O CPF é obrigatório.",
                  maxLength: { value: 14, message: "Limite de 14 caracteres." },
                })}
              />
              {errors.cpf && (
                <Form.Text className="invalid-feedback">
                  {errors.cpf.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                className={errors.dataNascimento && "is-invalid"}
                {...register("dataNascimento")}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Alabasta"
                    className={errors.endereco?.cidade && "is-invalid"}
                    {...register("endereco.cidade", {
                      required: "A cidade é obrigatória.",
                      maxLength: {
                        value: 255,
                        message: "Limite de 255 caracteres.",
                      },
                    })}
                  />
                  {errors.endereco?.cidade && (
                    <Form.Text className="invalid-feedback">
                      {errors.endereco?.cidade.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              {/* Dropdown aqui */}
              {/* <Form.Group as={Col}>
                <Dropdown className="mt-4" drop="end">
                  <Dropdown.Toggle variant="warning">UF</Dropdown.Toggle>
                  <Dropdown.Menu className="super-colors">
                    <Dropdown.Item>SP</Dropdown.Item>
                    <Dropdown.Item>CE</Dropdown.Item>
                    <Dropdown.Item>CE</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">CE</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">CE</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">CE</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">CE</Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      {...register("endereco.uf", {
                        required: "O UF é obrigatório.",
                        maxLength: {
                          value: 2,
                          message: "Limite de 2 caracteres",
                        },
                      })}
                    >
                      PE
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  {errors.endereco?.uf && (
                    <Form.Text className="invalid-feedback">
                      {errors.endereco?.uf.message}
                    </Form.Text>
                  )}
                </Dropdown>
              </Form.Group> */}
              <Form.Group as={Col} className="mb-3">
                <Form.Label>UF</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className={errors.endereco?.uf && "is-invalid"}
                  {...register("endereco.uf", {
                    required: "O UF é obrigatório.",
                    maxLength: { value: 2, message: "Limite de 2 caracteres" },
                  })}
                >
                  <option value="default">Unidade Federativa</option>
                  <option value="1">PE</option>
                  <option value="2">SP</option>
                  <option value="3">RJ</option>
                  <option value="4">CE</option>
                </Form.Select>
                {errors.endereco?.uf && (
                  <Form.Text className="invalid-feedback">
                    {errors.endereco?.uf.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="99999-999"
                  pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                  title="Formato: 123.456.789-12"
                  className={errors.endereco?.cep && "is-invalid"}
                  {...register("endereco.cep", {
                    required: "O CEP é obrigatório.",
                    maxLength: { value: 9, message: "Limite de 9 caracteres." },
                  })}
                />
                {errors.endereco?.cep && (
                  <Form.Text className="invalid-feedback">
                    {errors.endereco?.cep.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Rua</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Avenida Paulista"
                  className={errors.endereco?.rua && "is-invalid"}
                  {...register("endereco.rua", {
                    required: "A rua é obrigatória.",
                    maxLength: {
                      value: 100,
                      message: "Limite de 100 caracteres.",
                    },
                  })}
                />
                {errors.endereco?.rua && (
                  <Form.Text className="invalid-feedback">
                    {errors.endereco?.rua.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Numero</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="5"
                  className={errors.endereco?.numero && "is-invalid"}
                  {...register("endereco.numero", {
                    required: "O número é obrigatório.",
                    maxLength: {
                      value: 100,
                      message: "Limite de 100 caracteres.",
                    },
                  })}
                />
                {errors.endereco?.numero && (
                  <Form.Text className="invalid-feedback">
                    {errors.endereco?.numero.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Casa ou Apt"
                  className={errors.endereco?.complemento && "is-invalid"}
                  {...register("endereco.complemento", {
                    required: "O complemento é obrigatório.",
                    maxLength: {
                      value: 100,
                      message: "Limite de 100 caracteres.",
                    },
                  })}
                />
                {errors.endereco?.complemento && (
                  <Form.Text className="invalid-feedback">
                    {errors.endereco?.complemento.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center">
              <Button variant="warning" type="submit" color="light">
                Cadastrar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}