import axios from "axios"
import { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { ContextLogin } from "../../contexts/LoginContext";
import perfilRestMobile from "../../assets/images/chefe.png";
import perfilRestWeb from "../../assets/images/garconete.png";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import { ContainerCardImg } from "../../components/ContainerCardImg/ContainerCardImg";
import { CustomInputIconNone } from "../../components/CustomInputIconNone/CustomInputIconNone";
import "./EditarRestaurante.css";

export function EditaRestaurante() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { idRes } = useContext(ContextRestaurant);
    const { config } = useContext(ContextLogin);
    const navigate = useNavigate();


    function onSubmit(data) {
        axios.put(`http://localhost:3001/restaurantes/${idRes}`, data, config)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 })
                navigate(`/restaurante/home`)
            })

            .catch(error => {
                toast.error(error.response.data.message, { position: "botom-right", duration: 2000 })
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/restaurantes/${idRes}`, config)
            .then(response => {
                //TODO --> Tirar email e senha como obrigatório do put, tanto no front quanto no back.
                const { nomeFantasia, razaoSocial, telefone, cnpj, email, senha, endereco: { uf, cidade, cep, rua, numero, complemento } } = response.data
                reset({ nomeFantasia, razaoSocial, telefone, cnpj, email, senha, endereco: { uf, cidade, cep, rua, numero, complemento } })
            })
    }, [idRes, reset])


    return (
        <>
            <ContainerCenterMobile className="background-gradient-escuro container-edit-rest">
                <main className="container-perfil-rest rounded-5">
                    <div className="flex-perfil-rest ms-3">
                        <div className="colTwo-perfil-rest">
                            <ContainerCardImg className="card-web-rest">
                                <img
                                    src={perfilRestWeb}
                                    className="mt-4 imagem-perfil-web"
                                    alt="Imagem de uma garçonete entregado comida"
                                />
                                <img
                                    src={perfilRestMobile}
                                    className="mt-4 imagem-perfil-mobile"
                                    alt="Imagem de um chef"
                                />
                            </ContainerCardImg>
                        </div>

                        <div className="colOne-perfil-rest">
                            <div className="px-3 py-4">
                                <h1 className="title-perfil-rest">Perfil</h1>
                                <Form className="form-perfil" onSubmit={handleSubmit(onSubmit)}>

                                    <div className="mb-3">
                                        <label className="form-label">Nome Fantasia</label>
                                        <CustomInputIconNone
                                            type="text"
                                            register={register("nomeFantasia", {
                                                required: "O Nome Fantasia é obrigatório.",
                                                maxLength: {
                                                    value: 130,
                                                    message: "Limite de 130 caracteres.",
                                                },
                                            })}
                                            error={errors.nomeFantasia}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Razão Social</label>
                                        <CustomInputIconNone
                                            type="text"
                                            register={register("razaoSocial", {
                                                required: "A Razão Social é obrigatória.",
                                            })}
                                            error={errors.nomeFantasia}
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
                                        <label className="form-label">CNPJ</label>
                                        <CustomInputIconNone
                                            type="text"
                                            pattern="[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}|[0-9]{15}-[0-9]{2}"
                                            title="Formato: 12.345.678/0001-00"
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
                                            route="/restaurante/home"
                                            icon="white bi bi-arrow-left-circle-fill"
                                            className="botao-voltar-editar"
                                            tooltipContent="Voltar para a home"
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


