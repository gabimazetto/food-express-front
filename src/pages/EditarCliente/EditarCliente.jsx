import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import editImg from "../../assets/images/surprised-girl1.png";
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";
import { ContextClient } from "../../contexts/ClientContext";

export function EditarCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { idCli } = useContext(ContextClient);
  const navigate = useNavigate();
  const [lock, setLock] = useState(true);
  const dayjs = require("dayjs");
  const today = dayjs();

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/clientes/${idCli}`, data)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/cliente/home");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/clientes/${idCli}`).then((response) => {
      const {
        nome,
        email,
        senha,
        telefone,
        cpf,
        dataNascimento,
        endereco: { uf, cidade, cep, rua, numero, complemento },
      } = response.data;
      reset({
        nome,
        email,
        senha,
        telefone,
        cpf,
        dataNascimento,
        endereco: { uf, cidade, cep, rua, numero, complemento },
      });
    });
  }, [idCli, reset]);

  return (
    <>
      <div className="background-gradient ">
        <Card>
          <Card.Body>
            <h1>Perfil</h1>
            <Row>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={lock}>
                  <CustomInputIconNone
                    label="Nome Completo"
                    type="text"
                    className="input-web"
                    register={register("nome", {
                      required: "O nome completo é obrigatório.",
                    })}
                    error={errors.nome}
                  />

                  <CustomInputIconNone
                    label="Email"
                    type="email"
                    className="input-web"
                    register={register("email", {
                      required: "O email é obrigatório.",
                    })}
                    error={errors.email}
                  />

                  <CustomInputIconNone
                    label="Senha"
                    type="password"
                    className="input-web"
                    register={register("senha", {
                      required: "A senha é obrigatória.",
                    })}
                    error={errors.senha}
                  />

                  <CustomInputIconNone
                    label="Telefone"
                    type="tel"
                    className="input-web"
                    pattern="[(0-9)]{4}[0-9]{5}-[0-9]{4}|[0-9]{2}[0-9]{5}-[0-9]"
                    title="(99)99999-9999 ou 1212345-1234"
                    register={register("telefone", {
                      required: "O telefone é obrigatório.",
                      maxLength: {
                        value: 14,
                        message: "Limite de 14 caracteres.",
                      },
                    })}
                    error={errors.telefone}
                  />
                  <CustomInputIconNone
                    label="CPF"
                    type="text"
                    className="input-web"
                    pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}|[0-9]{9}-[0-9]{2}"
                    title="Formato: 123.456.789-12 ou 123456789-12"
                    register={register("cpf", {
                      required: "O cpf é obrigatório.",
                      maxLength: {
                        value: 14,
                        message: "Limite de 14 caracteres.",
                      },
                    })}
                    error={errors.cpf}
                  />
                  <CustomInputIconNone
                    label="Data de Nascimento"
                    type="date"
                    min={dayjs("1920-01-01").format("YYYY-MM-DD")}
                    max={today.subtract(13, "year").format("YYYY-MM-DD")}
                    className="input-web"
                    register={register("dataNascimento")}
                  />

                  <CustomInputIconNone
                    label="Cidade"
                    type="text"
                    className="input-web"
                    register={register("endereco.cidade", {
                      required: "O nome da cidade é obrigatório.",
                      maxLength: {
                        value: 14,
                        message: "Limite de 14 caracteres.",
                      },
                    })}
                    error={errors.cidade}
                  />

                  <Form.Group className="mb-3">
                    <Form.Label>UF</Form.Label>
                    <Form.Select
                      className="input-web"
                      {...register("endereco.uf", {
                        required: "O UF é obrigatório.",
                        maxLength: {
                          value: 2,
                          message: "Limite de 2 caracteres.",
                        },
                      })}
                    >
                      <option value="default">Unidade Federativa</option>
                      <option value="1">AC</option>
                      <option value="2">AL</option>
                      <option value="3">AP</option>
                      <option value="4">AM</option>
                      <option value="5">BA</option>
                      <option value="6">CE</option>
                      <option value="7">DF</option>
                      <option value="8">ES</option>
                      <option value="9">GO</option>
                      <option value="10">MA</option>
                      <option value="11">MT</option>
                      <option value="12">MS</option>
                      <option value="13">MG</option>
                      <option value="14">PA</option>
                      <option value="15">PB</option>
                      <option value="16">PR</option>
                      <option value="17">PE</option>
                      <option value="18">PI</option>
                      <option value="19">RJ</option>
                      <option value="20">RN</option>
                      <option value="21">RS</option>
                      <option value="22">RO</option>
                      <option value="23">RR</option>
                      <option value="24">SC</option>
                      <option value="25">SP</option>
                      <option value="26">SE</option>
                      <option value="27">TO</option>
                    </Form.Select>
                    {errors.endereco?.uf && (
                      <Form.Text className="invalid-feedback">
                        {errors.endereco?.uf.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <CustomInputIconNone
                    label="CEP"
                    type="text"
                    pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                    title="Formato: 12345-123 ou 12345678"
                    className="input-web"
                    register={register("endereco.cep", {
                      required: "O CEP é obrigatório.",
                      maxLength: {
                        value: 9,
                        message: "Limite de 9 caracteres.",
                      },
                    })}
                    error={errors.cep}
                  />

                  <CustomInputIconNone
                    label="Rua"
                    type="text"
                    className="input-web"
                    register={register("endereco.rua", {
                      required: "A rua é obrigatória.",
                      maxLength: {
                        value: 100,
                        message: "Limite de 100 caracteres.",
                      },
                    })}
                    error={errors.rua}
                  />
                  <CustomInputIconNone
                    label="Numero"
                    type="text"
                    className="input-web"
                    register={register("endereco.numero", {
                      required: "O número é obrigatório.",
                      maxLength: {
                        value: 100,
                        message: "Limite de 100 caracteres.",
                      },
                    })}
                    error={errors.numero}
                  />
                  <CustomInputIconNone
                    label="Complemento"
                    type="text"
                    className="input-web"
                    register={register("endereco.complemento", {
                      maxLength: {
                        value: 100,
                        message: "Limite de 100 caracteres.",
                      },
                    })}
                    error={errors.complemento}
                  />
                </fieldset>

                <Row>
                  <Col>
                    <div className="d-flex justify-content-center">
                      <Button
                        className="white"
                        variant="primary"
                        type="submit"
                        disabled={lock ? "" : "true"}
                      >
                        Confirmar
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-center">
                      <Button
                        className="white"
                        variant="primary"
                        onClick={() => setLock(!lock)}
                      >
                        {lock ? "Editar Perfil" : "Salvar"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>

              {/*  <Col>
                <img src={editImg} alt="" />
              </Col> */}
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
