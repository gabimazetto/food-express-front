import React, { useContext, useState } from "react";
import {
  Form,
} from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import Divider from "../../components/Divider/Divider";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import loginImg from "../../assets/images/meninaNoteFood.png";
import logo from "../../assets/images/logoTemaClaro.png";
import "./LoginCliente.css";
import { useForm } from "react-hook-form";
import { ContextClient } from "../../contexts/ClientContext";
import { useNavigate } from "react-router-dom";

export function LoginCliente() {
  const { handleLogin } = useContext(ContextClient);
  const { register, handleSubmit, formState:{errors} } = useForm();
  const navigate = useNavigate();
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

  function onSubmit(data) {
    handleLogin(data).then(() => {
      navigate(`/cliente/home`);
    });
  }

  return (
    <>
      <ContainerCenterMobile className="background-gradient">
        <main className="border container-login rounded-5 ">
          
            <div className="colTwoLogin" >
             
                <img
                  src={loginImg}
                  className="img-login"
                  alt="Imagem de uma mulher no computador vendo imagens de comidas"
                />              
            </div>
            <div className="colOneLogin">
              <div className="px-3 py-4 conteudo-login">
                <img src={logo} class="img-fluid logo-login pb-5" alt="Logo do FoodExpress" />

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <CustomInput
                    className="input-web"
                    type="email"
                    register={register("email", {
                      required: "Email é obrigatório"
                    })}
                    placeholder="Digite seu e-mail"
                    icon="bi bi-envelope-at-fill white "
                  />

                  <CustomInput                    
                    className="input-web"
                    type={senha}
                    placeholder="Digite sua senha"
                    icon={icone}
                    register={register("senha", {
                      required: "A senha é obrigatória",
                    })}
                    error={errors.senha}
                    toggleType={mudarTipo}
                    iconType={icone}
                  />

                  <div className="d-grid gap-2 mt-4">
                    <ButtonNavigation
                      text="Login"
                      type="submit"
                      className="white"
                    />
                  </div>
                </Form>
                <Divider>OU</Divider>

                <ButtonNavigation
                  text="Seja nosso cliente, cadastre-se aqui"
                  route="/cliente/cadastro"
                  className="my-button-not-filled"
                />

                <ButtonNavigation
                  text="Seja nosso parceiro, cadastre-se aqui"
                  route="/restaurante/cadastro"
                  className="my-button-not-filled"
                />
              </div>
            </div>

          


        </main>
      </ContainerCenterMobile>
    </>
  );
}