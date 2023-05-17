import axios from "axios";
import { useState } from "react";
import {
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";

export function CadastroCliente() {
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
      .post("http://localhost:3001/clientes", data)
      .then((response) => {
        toast.success("Cliente adicionado", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/cliente/login");
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
            <h1 className="text-center">Cadastro Cliente</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <CustomInputIconNone
                className="input-web"
                type="text"
                placeholder="Informe seu nome"
                icon=""
                register={register("nome", { required: "O nome é obrigatório" })}
                error={errors.nome}
              />

              <CustomInput
                className="input-web"
                type="email"
                placeholder="Informe seu e-mail"
                icon="bi bi-envelope-at-fill white "
                register={register("email", { required: "O email é obrigatório" })}
                error={errors.email}
              />

              <CustomInput
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

              <CustomInput
                label="Telefone"
                type="tel"
                icon="bi bi-telephone white"
                className="input-web"
                pattern="[(0-9)]{4}[0-9]{5}-[0-9]{4}|[0-9]{2}[0-9]{5}-[0-9]"
                placeholder="Informe seu telefone no formato: (99)99999-9999 ou 1212345-1234"
                register={register("telefone", {
                  required: "O telefone é obrigatório.",
                  maxLength: {
                    value: 14,
                    message: "Limite de 14 caracteres.",
                  },
                })}
                error={errors.telefone}
              />

              <CustomInput
                type="date"
                icon="bi bi-calendar-date white"
                min={dayjs("1920-01-01").format("YYYY-MM-DD")}
                max={today.subtract(13, "year").format("YYYY-MM-DD")}
                className="input-web"
                register={register("dataNascimento")}
              />

              <CustomInputIconNone
                className="input-web"
                type="text"
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}|[0-9]{9}-[0-9]{2}"
                placeholder="Informe seu CPF no formato: 123.456.789-12 ou 123456789-12"
                icon=""
                register={register("cpf", { required: "O CPF é obrigatório." })}
                error={errors.cpf}
              />

              <CustomInputIconNone
                className="input-web"
                type="text"
                placeholder="Informe sua cidade"
                register={register("endereco.cidade", { required: "A Cidade é obrigatória" })}
                error={errors.endereco?.cidade}
              />

              <CustomInputIconNone
                className="input-web"
                type="text"
                placeholder="Informe seu estado com dois caracteres ex: SP"
                register={register("endereco.uf", { required: "O Estado é obrigatório" })}
                error={errors.endereco?.uf}
              />

              <CustomInputIconNone
                className="input-web"
                type="text"
                placeholder="Informe seu CEP no formato: 99999-999"
                pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                register={register("endereco.cep", { required: "O CEP é obrigatório" })}
                error={errors.endereco?.cep}
              />

              <CustomInputIconNone
                className="input-web"
                type="text"
                placeholder="Informe seu logradouro"
                register={register("endereco.rua", { required: "A rua é obrigatória." })}
                error={errors.endereco?.rua}
              />

              <CustomInputIconNone
                className="input-web"
                type="text"
                placeholder="Informe seu número residencial"
                register={register("endereco.numero", { required: "O número é obrigatório." })}
                error={errors.endereco?.numero}
              />

              <CustomInputIconNone
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
    </>
  );
}