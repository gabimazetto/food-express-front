import axios from "axios";
import { useContext, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
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
import "./EditarRestaurante.css";

export function EditaRestaurante() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { idRes } = useContext(ContextRestaurant);
  const { config } = useContext(ContextLogin);
  const navigate = useNavigate();

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/restaurantes/${idRes}`, data, config)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        navigate(`/restaurante/home`);
      })

      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "botom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/restaurantes/${idRes}`, config)
      .then((response) => {
        //TODO --> Tirar email e senha como obrigatório do put, tanto no front quanto no back.
        const {
          nomeFantasia,
          telefone,
          endereco: { uf, cidade, cep, rua, numero, complemento },
        } = response.data;
        reset({
          nomeFantasia,
          telefone,
          endereco: { uf, cidade, cep, rua, numero, complemento },
        });
      });
  }, [idRes, reset]);

  return (
    <>
      <ContainerCenterMobile className="background-gradient-escuro container-edit-rest">
        <main className="container-perfil-rest">
          <div className="container-imagem-rest">
            <ContainerCardImg className="card-web-rest">
              <img
                src={perfilRestWeb}
                className="mt-4 imagem-perfilRes-web"
                alt="Imagem de uma garçonete entregado comida"
              />
              <img
                src={perfilRestMobile}
                className="mt-4 imagem-perfilRes-mobile"
                alt="Imagem de um chef"
              />
            </ContainerCardImg>
          </div>

          <div className="container-formulario me-1">
            <div className="container-titulo-perfil">
              <h1 className="title-perfil-rest">Perfil</h1>
            </div>
            <Form className="form-perfil" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfil">
                    <Form.Label>Nome Fantasia:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.nomeFantasia && "is-invalid"}`} type="text" {...register("nomeFantasia", { required: "O nome completo é obrigatório", maxLength: { value: 25, message: "Limite de 25 caracteres." } })} />
                    {errors.nomeFantasia && (<Form.Text className="invalid-feedback">{errors.nomeFantasia.message}</Form.Text>)}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfil">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control title="(XX)XXXXX-XXXX ou XXXXXXXXXXX" className={`formulario-editar-perfil ${errors.telefone && "is-invalid"}`} type="tel"  {...register("telefone", { required: "O telefone é obrigatório.", maxLength: { value: 14, message: "Limite de 14 caracteres." }, pattern: { value: /[(0-9)]{4}[0-9]{5}-[0-9]{4}|[(0-9)]{11}/, message: "Formato inválido." } })} />
                    {errors.telefone && (<Form.Text className="invalid-feedback">{errors.telefone.message}</Form.Text>)}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="inputs-editar-rest mb-3">
                <Form.Group className="input-cidade">
                  <InputGroup className="input-group-perfil">
                    <Form.Label className="cidade-perfil">Cidade:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.cidade && "is-invalid"}`} type="text" {...register("endereco.cidade", { required: "O nome da cidade é obrigatório.", maxLength: { value: 14, message: "Limite de 14 caracteres." } })} />
                    {errors.cidade && <Form.Text className="invalid-feedback">{errors.cidade}</Form.Text>}
                  </InputGroup>
                  <Form.Group className="input-group-uf">
                  <InputGroup className="input-group-perfil ">
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
                </Form.Group>

                


                <Form.Group className="input-cep">
                  <InputGroup className="input-group-perfil">
                    <Form.Label>CEP:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.cep && "is-invalid"}`} type="text" {...register("endereco.cep", { required: "O CEP é obrigatório.", maxLength: { value: 9, message: "Limite de 9 caracteres." }, pattern: { value: /^(\d{5}-\d{3}|\d{8})$/, message: "Formato inválido." } })} />
                    {errors.cep && <Form.Text className="invalid-feedback">{errors.cep.message}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group className="">
                  <InputGroup className="input-group-perfil">
                    <Form.Label>Logradouro:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.rua && "is-invalid"}`} type="text" {...register("endereco.rua", { required: "A rua é obrigatória.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />
                    {errors.rua && <Form.Text className="invalid-feedback">{errors.rua}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="container-num-cep mb-4">
                <Form.Group className="num-comp-perfil">
                  <InputGroup className="input-group-perfil">
                    <Form.Label>Número:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.numero && "is-invalid"}`} type="text" {...register("endereco.numero", { required: "O número é obrigatório.", maxLength: { value: 10, message: "Limite de 10 caracteres." } })} />
                    {errors.numero && <Form.Text className="invalid-feedback">{errors.numero}</Form.Text>}
                  </InputGroup>
                </Form.Group>

                <Form.Group className="num-comp-perfil">
                  <InputGroup className="input-group-perfil">
                    <Form.Label className="complemento-perfil">Complemento:</Form.Label>
                    <Form.Control className={`formulario-editar-perfil ${errors.endereco?.complemento && "is-invalid"}`} type="text" {...register("endereco.complemento", { maxLength: { value: 15, message: "Limite de 15 caracteres." } })} />
                    {errors.complemento && <Form.Text className="invalid-feedback">{errors.complemento}</Form.Text>}
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-3 ms-2">

                <ButtonNavigation text="Salvar alterações" type="submit" className="white button-perfil " />
              </div>
            </Form>

          </div>
        </main>
        <div className="d-flex justify-content-start align-items-start mt-3 ms-3">
                    <ButtonNavigation
                        type="submit"
                        route="/restaurante/home"
                        icon="white bi bi-arrow-left-circle-fill"
                        className=" d-flex justify-content-center align-items-center mt-5 mb-5"
                        tooltipContent="Voltar para a home"
                    />
                </div>
      </ContainerCenterMobile>
    </>
  );
}
