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
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";
import { CustomInput } from "../../components/CustomInput/CustomInput";

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
  const dayjs = require("dayjs");
  const today = dayjs();

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
    <section id="pagina">
      <div data-theme="white-content" className="container body-content py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <Card className="shadow-2-strong radius-2 mb-4">
              <Card.Body className="p-4">
                <h1 className="text-center">Cadastro Restaurante</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <CustomInputIconNone
                    label="Nome Fantasia"
                    className="input-web"
                    type="text"
                    placeholder="Informe o nome fantasia do estabelecimento"
                    icon=""
                    register={register("nomeFantasia", {
                      required: "O nome fantasia é obrigatório", maxLength: {
                        value: 130,
                        message: "Limite de 130 caracteres.",
                      },
                    })}
                    error={errors.nomeFantasia}
                  />

                  <CustomInput
                    label="Razão Social"
                    className="input-web"
                    type="text"
                    placeholder="Informe a razão social do seu estabelecimento"
                    icon="bi bi-envelope-at-fill white"
                    register={register("razaoSocial", { required: "A razão social é obrigatória" })}
                    error={errors.razaoSocial}
                  />

                  <CustomInput
                    label="Telefone"
                    small="Formato do telefone: (99)99999-9999 ou 1212345-1234"
                    type="tel"
                    icon="bi bi-telephone white"
                    className="input-web"
                    pattern="^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$"
                    placeholder="Informe seu telefone no formato: "
                    register={register("telefone", {
                      pattern: "Formato do telefone: (99)99999-9999 ou 1212345-1234",
                      required: "O telefone é obrigatório.",
                      maxLength: {
                        value: 14,
                        message: "Limite de 14 caracteres.",
                      },
                    })}
                    error={errors.telefone}
                  />

                  <CustomInputIconNone
                    label="CNPJ"
                    small="Formato do CNPJ: 12.345.678/0001-00"
                    className="input-web"
                    type="text"
                    pattern="[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}|[0-9]{15}-[0-9]{2}"
                    placeholder="Informe seu CNPJ"
                    icon=""
                    register={register("cnpj", { required: "O CNPJ é obrigatório." })}
                    error={errors.cnpj}
                  />

                  <CustomInput
                    label="Email"
                    className="input-web"
                    type="email"
                    placeholder="Informe seu e-mail"
                    icon="bi bi-envelope-at-fill white"
                    register={register("email", { required: "O email é obrigatório" })}
                    error={errors.email}
                  />

                  <CustomInput
                    label="Senha"
                    className="input-web"
                    type={senha}
                    placeholder="Crie sua senha"
                    icon={icone}
                    register={register("senha", {
                      required: "A senha é obrigatória",
                    })}
                    error={errors.senha}
                    toggleType={mudarTipo}
                    iconType={icone}
                  />

                  <CustomInput
                    label="Confirmação de senha"
                    className="input-web"
                    type={senha2}
                    placeholder="Confirme sua senha"
                    icon={icone2}
                    register={register("confirmarSenha", {
                      required: "As senhas devem ser iguais",
                      validate: (value) =>
                        value === getValues("senha") ||
                        "As senhas devem ser iguais",
                    })}
                    error={errors.confirmarSenha}
                    toggleType={mudarTipo2}
                    iconType={icone2}
                  />

                  <CustomInputIconNone
                    label="Cidade"
                    className="input-web"
                    type="text"
                    placeholder="Informe sua cidade"
                    register={register("endereco.cidade", { required: "A Cidade é obrigatória" })}
                    error={errors.endereco?.cidade}
                  />

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex">UF</Form.Label>
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
                    small="Formato do CEP: 99999-999"
                    className="input-web"
                    type="text"
                    placeholder="Informe seu CEP"
                    pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                    register={register("endereco.cep", { required: "O CEP é obrigatório" })}
                    error={errors.endereco?.cep}
                  />

                  <CustomInputIconNone
                    label="Logradouro"
                    className="input-web"
                    type="text"
                    placeholder="Informe seu logradouro"
                    register={register("endereco.rua", { required: "A rua é obrigatória." })}
                    error={errors.endereco?.rua}
                  />

                  <CustomInputIconNone
                    label="Número"
                    className="input-web"
                    type="text"
                    placeholder="Informe seu número residencial"
                    register={register("endereco.numero", { required: "O número é obrigatório." })}
                    error={errors.endereco?.numero}
                  />

                  <CustomInputIconNone
                    label="Complemento"
                    className="input-web"
                    type="text"
                    placeholder="Informe um complemento"
                    register={register("endereco.complemento")}
                    error={errors.endereco?.complemento}
                  />

                  <div className="d-flex justify-content-center">
                    <Button variant="warning" type="submit" color="light">
                      Cadastrar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
