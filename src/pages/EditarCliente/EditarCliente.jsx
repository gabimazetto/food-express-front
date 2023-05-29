import axios from "axios";
import { useContext, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
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
    axios
      .get(`http://localhost:3001/clientes/${idCli}`, config)
      .then((response) => {
        const {
          nome,
          telefone,
          cpf,
          dataNascimento,
          endereco: { uf, cidade, cep, rua, numero, complemento },
        } = response.data;
        reset({
          nome,
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
        <main className="container-perfil-cli">
          <div className="container-imagem-cli">
            <ContainerCardImg className="card-web-cli">
              <img
                src={perfilClienteWeb}
                className="mt-4 imagem-perfilCli-web"
                alt="Imagem de uma menina surpresa"
              />
              <img
                src={perfilClienteMobile}
                className="mt-4 imagem-perfilCli-mobile"
                alt="Imagem de uma menina"
              />
            </ContainerCardImg>
          </div>


          <div className="container-formulario-cli">
            <div className="container-titulo-perfil-cli">
              <h1 className="title-perfil-cli">Perfil</h1>
            </div>

            <Form className="form-perfil-cli" onSubmit={handleSubmit(onSubmit)}>

              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label>Nome Completo:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.nome && "is-invalid"}`} type="text" {...register("nome", { required: "O nome completo é obrigatório", maxLength: { value: 25, message: "Limite de 25 caracteres." } })} />
                    {errors.nome && (<Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>)}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control title="(XX)XXXXX-XXXX ou XXXXXXXXXXX" className={`formulario-editar-perfil ${errors.telefone && "is-invalid"}`} type="tel" {...register("telefone", { required: "O telefone é obrigatório.", maxLength: { value: 14, message: "Limite de 14 caracteres." }, pattern: { value: /[(0-9)]{4}[0-9]{5}-[0-9]{4}|[(0-9)]{11}/, message: "Formato inválido." } })} />
                    {errors.telefone && (<Form.Text className="invalid-feedback">{errors.telefone.message}</Form.Text>)}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control title="Formato: 123.456.789-12 ou 123456789-12" className={`formulario-editar-perfil ${errors.cpf && "is-invalid"}`} type="text" {...register("cpf", { maxLength: { value: 14, message: "Limite de 14 caracteres." }, required: "O CPF é obrigatório.", pattern: { value: /[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}|[0-9]{11}/, message: "Formato inválido." } })}
                    />
                    {errors.cpf && <Form.Text className="invalid-feedback">{errors.cpf.message}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label>Data de nascimento:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.dataNascimento && "is-invalid"}`} type="date" max={today.subtract(13, "year").format("YYYY-MM-DD")} min={dayjs("1920-01-01").format("YYYY-MM-DD")} {...register("dataNascimento")} />
                    {errors.dataNascimento && <Form.Text className="invalid-feedback">{errors.dataNascimento}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="inputs-editar-cli mb-3">
                <Form.Group className="input-cidade">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label className="cidade-perfil">Cidade:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.cidade && "is-invalid"}`} type="text" {...register("endereco.cidade", { required: "O nome da cidade é obrigatório.", maxLength: { value: 14, message: "Limite de 14 caracteres." } })} />
                    {errors.cidade && <Form.Text className="invalid-feedback">{errors.cidade}</Form.Text>}
                  </InputGroup>
                </Form.Group>

                <Form.Group className="">
                  <InputGroup className="input-group-perfil">
                    <Form.Label className="">UF</Form.Label>
                    <Form.Select className="select-perfil input-uf" {...register("endereco.uf", { required: "O UF é obrigatório.", maxLength: { value: 2, message: "Limite de 2 caracteres.", }, })}>
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
                    {errors.endereco?.uf && (<Form.Text className="invalid-feedback"> {errors.endereco?.uf.message} </Form.Text>)}
                  </InputGroup>
                </Form.Group>


                <Form.Group className="input-cep">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label>CEP:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.cep && "is-invalid"}`} title="Formato: 12345-123 ou 12345678" type="text" {...register("endereco.cep", { required: "O CEP é obrigatório.", maxLength: { value: 9, message: "Limite de 9 caracteres." }, pattern: { value: /^(\d{5}-\d{3}|\d{8})$/, message: "Formato inválido." } })} />
                    {errors.cep && <Form.Text className="invalid-feedback">{errors.cep.message}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>



              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label>Logradouro:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.rua && "is-invalid"}`} type="text" {...register("endereco.rua", { required: "A rua é obrigatória.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />
                    {errors.rua && <Form.Text className="invalid-feedback">{errors.rua}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>


              <div className="container-num-cep mb-4">
                <Form.Group className="num-comp-perfilCli">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label>Número:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.numero && "is-invalid"}`} type="text" {...register("endereco.numero", { required: "O número é obrigatório.", maxLength: { value: 10, message: "Limite de 10 caracteres." } })} />
                    {errors.numero && <Form.Text className="invalid-feedback">{errors.numero}</Form.Text>}
                  </InputGroup>
                </Form.Group>

                <Form.Group className="num-comp-perfil">
                  <InputGroup className="input-group-perfilCli">
                    <Form.Label className="complemento-perfil">Complemento:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.complemento && "is-invalid"}`} type="text" {...register("endereco.complemento", { maxLength: { value: 15, message: "Limite de 15 caracteres." } })} />
                    {errors.complemento && <Form.Text className="invalid-feedback">{errors.complemento}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>

              <div class="d-flex justify-content-evenly ">

                <ButtonNavigation
                  text="Salvar alterações"
                  type="submit"
                  className="white button-perfil mt-1 mb-3"
                />
              </div>
            </Form>
          </div>

        </main>

        <div className="d-flex justify-content-start align-items-start mt-3 ms-3">
                    <ButtonNavigation
                        type="submit"
                        route="/cliente/home"
                        icon="white bi bi-arrow-left-circle-fill"
                        className=" d-flex justify-content-center align-items-center mt-5 mb-5"
                        tooltipContent="Voltar para a home"
                    />
                </div>
      </ContainerCenterMobile>

    </>
  );
}
