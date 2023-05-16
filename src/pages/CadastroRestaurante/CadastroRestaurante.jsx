import axios from "axios";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function CadastroRestaurante() {
  const [senha, setSenha] = useState("password");
  const [icone, setIcone] = useState("bi bi-eye-slash text-light");
  function mudarTipo() {
    if (senha === "password") {
      setIcone("bi bi-eye-fill text-light");
      setSenha("text");
    } else {
      setIcone("bi bi-eye-slash text-light");
      setSenha("password");
    }
  }

  const [senha2, setSenha2] = useState("password");
  const [icone2, setIcone2] = useState("bi bi-eye-slash text-light");
  function mudarTipo2() {
    if (senha2 === "password") {
      setIcone2("bi bi-eye-fill text-light");
      setSenha2("text");
    } else {
      setIcone2("bi bi-eye-slash text-light");
      setSenha2("password");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    console.log(data);
    axios
      .post("http://localhost:3001/restaurantes", data)
      .then((response) => {
        toast.success("Restaurante adicionado", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/restaurante/login");
      })
      .catch((error) => {
        toast.error("Algo deu errado", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  return (
    <>
      <div className="container mt-2 ">
        <Card className="mt-3 mb-3" border="warning">
          <Card.Body>
            <h1 className="text-center">Cadastro</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mt-2 mb-3">
                <Form.Label>Nome Fantasia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Restaurante da Maria"
                  className={errors.nomeFantasia && "is-invalid"}
                  {...register("nomeFantasia", {
                    required: "O Nome Fantasia é obrigatório.",
                    maxLength: {
                      value: 130,
                      message: "Limite de 130 caracteres.",
                    },
                  })}
                />
                {errors.nomeFantasia && (
                  <Form.Text className="invalid-feedback">
                    {errors.nomeFantasia.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Razão Social</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Maria Comércio de Alimentos Ltda."
                  className={errors.razaoSocial && "is-invalid"}
                  {...register("razaoSocial", {
                    required: "A Razão Social é obrigatória.",
                  })}
                />
                {errors.razaoSocial && (
                  <Form.Text className="invalid-feedback">
                    {errors.razaoSocial.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="(99)99999-9999"
                  className={errors.telefone && "is-invalid"}
                  {...register("telefone", {
                    required: "O telefone é obrigatório.",
                  })}
                />
                {errors.telefone && (
                  <Form.Text className="invalid-feedback">
                    {errors.telefone.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="12.345.678/0001-00"
                  className={errors.cnpj && "is-invalid"}
                  {...register("cnpj", {
                    required: "O CNPJ é obrigatório.",
                    maxLength: {
                      value: 18,
                      message: "Limite de 18 caracteres.",
                    },
                  })}
                />
                {errors.cnpj && (
                  <Form.Text className="invalid-feedback">
                    {errors.cnpj.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="restaurantedamaria@email.com"
                  className={errors.email && "is-invalid"}
                  {...register("email", {
                    required: "O email é obrigatório.",
                  })}
                />
                {errors.email && (
                  <Form.Text className="invalid-feedback">
                    {errors.email.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <InputGroup>
                  <FormControl
                    type={senha}
                    placeholder="Insira sua senha aqui"
                    className={errors.senha && "is-invalid"}
                    {...register("senha", {
                      required: "A senha é obrigatória",
                    })}
                  />
                  <InputGroup.Text
                    className="password-toggle"
                    onClick={mudarTipo}
                  >
                    <i className={icone}></i>
                  </InputGroup.Text>
                </InputGroup>
                {errors.senha && (
                  <Form.Text className="invalid-feedback">
                    {errors.senha.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirme a senha</Form.Label>
                <InputGroup>
                  <FormControl
                    type={senha2}
                    placeholder="Confirme sua senha"
                    className={errors.confirmarSenha && "is-invalid"}
                    {...register("confirmarSenha", {
                      required: "As senhas devem ser iguais",
                      validate: (value) =>
                        value === getValues("senha") ||
                        "As senhas devem ser iguais",
                    })}
                  />
                  <InputGroup.Text
                    className="password-toggle"
                    onClick={mudarTipo2}
                  >
                    <i className={icone2}></i>
                  </InputGroup.Text>
                </InputGroup>
                {errors.confirmarSenha && (
                  <Form.Text className="invalid-feedback">
                    {errors.confirmarSenha.message}
                  </Form.Text>
                )}
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

                <Form.Group as={Col} className="mb-3">
                  <Form.Label>UF</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className={errors.endereco?.uf && "is-invalid"}
                    {...register("endereco.uf", {
                      required: "O UF é obrigatório.",
                      maxLength: {
                        value: 2,
                        message: "Limite de 2 caracteres",
                      },
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
                      maxLength: {
                        value: 9,
                        message: "Limite de 9 caracteres.",
                      },
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
                    placeholder="Complemento"
                    className={errors.endereco?.complemento && "is-invalid"}
                    {...register("endereco.complemento", {
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
    </>
  );
}
