import axios from "axios"
import { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";
import perfilClienteMobile from "../../assets/images/meninaDuvida.png";
import perfilClienteWeb from "../../assets/images/surpresa2.png";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import { ContainerCardImg } from "../../components/ContainerCardImg/ContainerCardImg";
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";
import "./EditarCliente.css";


export function EditarCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { config } = useContext(ContextLogin);
  const { idCli } = useContext(ContextClient);
  const navigate = useNavigate();
  const dayjs = require("dayjs");
  const today = dayjs();


  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/clientes/${idCli}`, data, config)
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
    axios.get(`http://localhost:3001/clientes/${idCli}`, config).then((response) => {
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
            <ContainerCenterMobile className="background-gradient-escuro container-edit-cli">
                <main className="container-perfil-cli rounded-5">
                    <div className="flex-perfil-cli ms-3">
                        <div className="colTwo-perfil-cli">
                            <ContainerCardImg className="card-web-cli">
                <img
                  src={perfilClienteWeb}
                  className="mt-4 imagem-perfil-web"
                  alt="Imagem de uma menina surpresa"
                />
                <img
                  src={perfilClienteMobile}
                  className="mt-4 imagem-perfil-mobile"
                  alt="Imagem de uma menina"
                />
                            </ContainerCardImg>
                        </div>

                        <div className="colOne-perfil-cli">
                            <div className="px-3 py-4">
                                <h1 className="title-perfil-cli">Perfil</h1>
                                <Form className="form-perfil" onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3">
                      <label className="form-label">Nome Completo</label>
                      <CustomInputIconNone
                        type="text"
                        register={register("nome", {
                          required: "O nome completo é obrigatório.",
                        })}
                        error={errors.nome}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <CustomInputIconNone
                        type="email"
                        register={register("email", {
                          required: "O email é obrigatório.",
                        })}
                        error={errors.email}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Senha</label>
                      <CustomInputIconNone
                        type="password"
                        register={register("senha", {
                          required: "A senha é obrigatória.",
                        })}
                        error={errors.senha}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Telefone</label>
                      <CustomInputIconNone
                        type="tel"
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
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Data de nascimento</label>
                      <CustomInputIconNone
                        type="date"
                        min={dayjs("1920-01-01").format("YYYY-MM-DD")}
                        max={today.subtract(13, "year").format("YYYY-MM-DD")}
                        register={register("dataNascimento")}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">CPF</label>
                      <CustomInputIconNone
                        type="text"
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
                    </div>

                    <div className="d-flex gap-4" >

                      <div className="mb-3 flex-grow-1">
                        <label className="form-label">Cidade</label>
                        <CustomInputIconNone
                          type="text"
                          register={register("endereco.cidade", {
                            required: "O nome da cidade é obrigatório.",
                            maxLength: {
                              value: 14,
                              message: "Limite de 14 caracteres.",
                            },
                          })}
                          error={errors.cidade}
                        />
                      </div>

                      <Form.Group className="mb-3 flex-grow-1">
                        <Form.Label className="d-flex">UF</Form.Label>
                        <Form.Select
                          className="select-perfil"
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
                          pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                          title="Formato: 12345-123 ou 12345678"
                          register={register("endereco.cep", {
                            required: "O CEP é obrigatório.",
                            maxLength: {
                              value: 9,
                              message: "Limite de 9 caracteres.",
                            },
                          })}
                          error={errors.cep}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Logradouro</label>
                      <CustomInputIconNone
                        type="text"
                        register={register("endereco.rua", {
                          required: "A rua é obrigatória.",
                          maxLength: {
                            value: 100,
                            message: "Limite de 100 caracteres.",
                          },
                        })}
                        error={errors.rua}
                      />
                    </div>

                    <div className="d-flex " >
                      <div className="mb-3 flex-grow-1">
                        <label className="form-label">Número</label>
                        <CustomInputIconNone
                          type="text"
                          register={register("endereco.numero", {
                            required: "O número é obrigatório.",
                            maxLength: {
                              value: 100,
                              message: "Limite de 100 caracteres.",
                            },
                          })}
                          error={errors.numero}
                        />
                      </div>

                      <div className="mb-3 flex-grow-1">
                        <label className="form-label">Complemento</label>
                        <CustomInputIconNone
                          type="text"
                          register={register("endereco.complemento", {
                            maxLength: {
                              value: 100,
                              message: "Limite de 100 caracteres.",
                            },
                          })}
                          error={errors.complemento}
                        />
                      </div>

                    </div>

                                    <div class="d-flex justify-content-between ">

                                        <ButtonNavigation
                                            
                                            type="submit"
                                            route="/cliente/home"
                                            icon="white bi bi-arrow-left-circle-fill"
                                            className="botao-voltar-editar"
                                        />

                                        <ButtonNavigation
                                            text="Salvar alterações"
                                            type="submit"
                                            className="white button-perfil mt-1 mb-3"

                                        />

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


