import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";
import "./CadastroRestaurante.css";
import cadastroRestauranteImg from "../../assets/images/chefe.png";
import imgCadastroWebRest from "../../assets/images/garconete.png";
import logo from "../../assets/images/logoTemaClaro.png";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import { ContainerCardImg } from "../../components/ContainerCardImg/ContainerCardImg"

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
    <>
      <ContainerCenterMobile className="background-gradient-escuro">
        <main className="border main-container rounded-5 ">
          <img
            src={logo}
            className="mt-4 ms-5 logo-web-cadastro"
            alt="Logo FoodExpress"
          />
          <h1 className="title-restaurant">Seja nosso parceiro e cadastre-se!</h1>
          <div className="flex">
            <div className="colTwo-rest">
              <ContainerCardImg className="card-web">
                <img
                  src={imgCadastroWebRest}
                  className="mt-4 imagem-cadastro-web"
                  alt="Imagem de duas pessoas fechando negócio"
                />
                <img
                  src={cadastroRestauranteImg}
                  className="mt-4 imagem-cadastro-mobile"
                  alt="Imagem fachada de um restaurante"
                />
              </ContainerCardImg>
            </div>

            <div className="colOne-rest">
              <div className="px-3 py-4">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Nome Fantasia</label>
                    <CustomInputIconNone
                      type="text"
                      placeholder="Informe o nome fantasia do estabelecimento"
                      register={register("nomeFantasia", {
                        required: "O nome fantasia é obrigatório",
                      })}
                      error={errors.nomeFantasia}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Razão Social</label>
                    <CustomInputIconNone
                      type="text"
                      placeholder="Informe a razão social do seu estabelecimento"
                      register={register("razaoSocial", {
                        required: "A razão social é obrigatória",
                      })}
                      error={errors.razaoSocial}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <CustomInputIconNone
                      type="tel"
                      icon="bi bi-telephone white"
                      pattern="[(0-9)]{4}[0-9]{5}-[0-9]{4}|[0-9]{2}[0-9]{5}-[0-9]"
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
                    <label className="form-label">CNPJ</label>
                    <CustomInputIconNone
                      type="text"
                      pattern="[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}|[0-9]{15}-[0-9]{2}"
                      placeholder="12.345.678/0001-00"
                      icon=""
                      register={register("cnpj", {
                        required: "O CNPJ é obrigatório.",
                      })}
                      error={errors.cnpj}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <CustomInputIconNone
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
                    <CustomInputIconNone
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

                  <div className="d-flex gap-4" >
                    <div className="mb-3 flex-grow-1">
                      <label className="form-label">Cidade</label>
                      <CustomInputIconNone
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

                    <div className="mb-3 flex-grow-1">
                      <label className="form-label">CEP</label>
                      <CustomInputIconNone
                        type="text"
                        placeholder="99999-999"
                        pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                        register={register("endereco.cep", {
                          required: "O CEP é obrigatório",
                        })}
                        error={errors.endereco?.cep}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Logradouro</label>
                    <CustomInputIconNone
                      type="text"
                      placeholder="Rua Ator Paulo Gustavo"
                      register={register("endereco.rua", {
                        required: "A rua é obrigatória.",
                      })}
                      error={errors.endereco?.rua}
                    />
                  </div>

                  <div className="d-flex " >
                    <div className="mb-3 flex-grow-1">
                      <label className="form-label">Número</label>
                      <CustomInputIconNone
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
                        type="text"
                        placeholder="Apt/Casa"
                        register={register("endereco.complemento")}
                        error={errors.endereco?.complemento}
                      />
                    </div>
                  </div>

                  <div class="d-grid gap-2 col-12 flex-fill">
                    <ButtonNavigation
                      text="Cadastrar"
                      type="submit"
                      className="white button_cadastro mt-5"
                    />
                    <hr />

                  </div>
                </Form>
              </div>
            </div>
          </div>
        </main>
      </ContainerCenterMobile>
    </>
  );
}
