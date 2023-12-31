import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";
import "./CadastroCliente.css";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import { ContainerCardImg } from "../../components/ContainerCardImg/ContainerCardImg";
import cadastroClienteImg from "../../assets/images/meninaPizza.png";
import imgCadastroWeb from "../../assets/images/ImgCadWeb.png";
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
      <ContainerCenterMobile className="background-gradient-escuro container-cadas-cli">
        {/* <div className="background-gradient-escuro"> */}
        <main className="container-cli-cad rounded-5 ">
          <div className="flex-cli-cad">
            <div className="colTwo-cli-cad">
              {/* <div class="text-center"> */}
              <ContainerCardImg className="card-web-cli-cad">
                <img
                  src={imgCadastroWeb}
                  className="mt-4 imagem-cadastro-web"
                  alt="Imagem de uma menina com uma fatia de pizza"
                />
                <img
                  src={cadastroClienteImg}
                  className="mt-4 imagem-cadastro-mobile"
                  alt="Imagem de uma menina com uma fatia de pizza"
                />
              </ContainerCardImg>
              {/* </div> */}
            </div>
            <div className="colOne-cli-card">
              <div className="px-3 py-4">
                <img
                  src={logo}
                  className="mt-4 ms-5 logo-web-cadastro"
                  alt="Imagem de uma menina com uma fatia de pizza"
                />
                <h1 className="title-client-cad mb-4 ms-5">
                  Cadastre-se e seja nosso cliente!
                </h1>
                <Form className="form-cad ms-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <CustomInputIconNone
                      className="form-cadastro-inputs"
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
                      className="form-cadastro-inputs"
                      type="email"
                      placeholder="Informe seu e-mail"
                      /*  icon="bi bi-envelope-at-fill white" */
                      register={register("email", {
                        required: "O email é obrigatório",
                      })}
                      error={errors.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <CustomInputIconNone
                      className="form-cadastro-inputs"
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
                    <CustomInputIconNone
                      className="form-cadastro-inputs"
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
                    <CustomInputIconNone
                      className="form-cadastro-inputs"
                      type="tel"
                      /*  icon="bi bi-telephone white" */
                      pattern="[(]{1}[0-9]{2}[)]{1}[0-9]{5}-[0-9]{4}|[(0-9)]{11}"
                      title="formato:(XX)XXXXX-XXXX ou XXXXXXXXXXX"
                      placeholder="(99)99999-9999"
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
                      className="form-cadastro-inputs"
                      type="date"
                      min={dayjs("1920-01-01").format("YYYY-MM-DD")}
                      max={today.subtract(13, "year").format("YYYY-MM-DD")}
                      // className="font-data"
                      register={register("dataNascimento")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <CustomInputIconNone
                      className="form-cadastro-inputs"
                      type="text"
                      pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}|[0-9]{11}"
                      title="formato: XXX.XXX.XXX-XX ou XXXXXXXXXXX"
                      placeholder="123.456.789-12"
                      register={register("cpf", {
                        required: "O CPF é obrigatório.",
                      })}
                      error={errors.cpf}
                    />
                  </div>

                  <div className="d-flex gap-4">
                    <div className="mb-3 flex-grow-1">
                      <label className="form-label">Cidade</label>
                      <CustomInputIconNone
                        className="form-cadastro-inputs"
                        type="text"
                        placeholder="Cidade"
                        register={register("endereco.cidade", {
                          required: "A Cidade é obrigatória",
                        })}
                        error={errors.endereco?.cidade}
                      />
                    </div>

                    <Form.Group className="mb-3 flex-grow-1">
                      <Form.Label className="d-flex">UF</Form.Label>
                      <Form.Select
                        className="select-cadastro"
                        {...register("endereco.uf", {
                          required: "O UF é obrigatório.",
                          maxLength: {
                            value: 2,
                          },
                        })}
                      >
                        <option value="default"></option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </Form.Select>
                      {errors.endereco?.uf && (
                        <Form.Text className="invalid-feedback">
                          {errors.endereco?.uf.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <div className="mb-3 flex-grow-1">
                      <label className="form-label">CEP</label>
                      <CustomInputIconNone
                        className="form-cadastro-inputs"
                        type="text"
                        placeholder="99999-999"
                        pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                        title="formato: XXXXX-XXX OU XXXXXXXX"
                        register={register("endereco.cep", {
                          required: "O CEP é obrigatório",
                          maxLength: {
                            value: 9,
                          },
                        })}
                        error={errors.endereco?.cep}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Logradouro</label>
                    <CustomInputIconNone
                      className="form-cadastro-inputs"
                      type="text"
                      placeholder="Rua Ator Paulo Gustavo"
                      register={register("endereco.rua", {
                        required: "A rua é obrigatória.",
                      })}
                      error={errors.endereco?.rua}
                    />
                  </div>

                  <div className="d-flex ">
                    <div className="mb-3 flex-grow-1">
                      <label className="form-label">Número</label>
                      <CustomInputIconNone
                        className="form-cadastro-inputs"
                        type="text"
                        placeholder="100"
                        register={register("endereco.numero", {
                          required: "O número é obrigatório.",
                        })}
                        error={errors.endereco?.numero}
                      />
                    </div>

                    <div className="mb-3 flex-grow-1">
                      <label className="form-label">Complemento</label>
                      <CustomInputIconNone
                        className="form-cadastro-inputs"
                        type="text"
                        placeholder="Apt/Casa"
                        register={register("endereco.complemento")}
                        error={errors.endereco?.complemento}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">

                    <ButtonNavigation
                      type="submit"
                      route="/"
                      icon="white bi bi-arrow-left-circle-fill"
                      className="botao-voltar-editar"
                      tooltipContent="Voltar para a home"
                    />

                    <ButtonNavigation
                      text="Cadastrar"
                      type="submit"
                      className="white button_cadastro"
                    />

                  </div>
                  <hr />
                </Form>
              </div>
            </div>
          </div>
        </main>

      </ContainerCenterMobile>
    </>
  );
}
