import axios from "axios";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";
import cadastroClienteImg from "../../assets/images/meninaPizza.png";
import "./CadastroCliente.css";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import logo from "../../assets/images/logoTemaClaro.png";


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
      <ContainerCenterMobile className="background-gradient">
        <div className="background-gradient-escuro">
          <main className="border container rounded-5 ">
            <div className="grid">
              <div className="colTwo">
                <div class="text-center">
                  <img
                    src={cadastroClienteImg}
                    className="mt-4 imagem-cadastro"
                    alt="Imagem de uma menina com uma fatia de pizza"
                  />
                </div>
              </div>
              <div className="colOne">
                <div className="px-3 py-4">
                  <img src={logo} class="img-fluid" alt="Logo do FoodExpress" />
                  <h1 className="text-center">Cadastre-se!</h1>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label">Nome</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="text"
                        placeholder="Informe seu nome"
                        register={register("nome", {
                          required: "O nome é obrigatório",
                        })}
                        error={errors.nome}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="email"
                        placeholder="Informe seu e-mail"
                        icon="bi bi-envelope-at-fill white"
                        register={register("email", {
                          required: "O email é obrigatório",
                        })}
                        error={errors.email}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Senha</label>
                      <CustomInput
                        className="input-web input-cadastro"
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
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Confirmação de senha</label>
                      <CustomInput
                        className="input-web input-cadastro"
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
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Telefone</label>
                      <CustomInput
                        type="tel"
                        icon="bi bi-telephone white"
                        className="input-web input-cadastro"
                        pattern="[(0-9)]{4}[0-9]{5}-[0-9]{4}|[0-9]{2}[0-9]{5}-[0-9]"
                        placeholder="Informe o telefone: (99)99999-9999"
                        register={register("telefone", {
                          required: "O telefone é obrigatório.",
                          maxLength: {
                            value: 14,
                            message: "Limite de 14 caracteres.",
                          },
                        })}
                        error={errors.telefone}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Data de nascimento</label>
                      <CustomInputIconNone
                        type="date"
                        icon="bi bi-calendar-date white"
                        min={dayjs("1920-01-01").format("YYYY-MM-DD")}
                        max={today.subtract(13, "year").format("YYYY-MM-DD")}
                        className="input-web input-cadastro"
                        register={register("dataNascimento")}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">CPF</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="text"
                        pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}|[0-9]{9}-[0-9]{2}"
                        placeholder="Informe seu CPF: 123.456.789-12"
                        icon=""
                        register={register("cpf", {
                          required: "O CPF é obrigatório.",
                        })}
                        error={errors.cpf}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Cidade</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="text"
                        placeholder="Informe sua cidade"
                        register={register("endereco.cidade", {
                          required: "A Cidade é obrigatória",
                        })}
                        error={errors.endereco?.cidade}
                      />
                    </div>

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

                    <div className="mb-3">
                      <label className="form-label">CEP</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="text"
                        placeholder="Informe seu CEP: 99999-999"
                        pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                        register={register("endereco.cep", {
                          required: "O CEP é obrigatório",
                        })}
                        error={errors.endereco?.cep}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Logradouro</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="text"
                        placeholder="Informe seu logradouro"
                        register={register("endereco.rua", {
                          required: "A rua é obrigatória.",
                        })}
                        error={errors.endereco?.rua}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Número</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="text"
                        placeholder="Informe seu número residencial"
                        register={register("endereco.numero", {
                          required: "O número é obrigatório.",
                        })}
                        error={errors.endereco?.numero}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Complemento</label>
                      <CustomInputIconNone
                        className="input-web input-cadastro"
                        type="text"
                        placeholder="Informe um complemento"
                        register={register("endereco.complemento")}
                        error={errors.endereco?.complemento}
                      />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <ButtonNavigation
                        text="Cadastrar"
                        type="submit"
                        className="white"
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ContainerCenterMobile>
    </>
  );
}
