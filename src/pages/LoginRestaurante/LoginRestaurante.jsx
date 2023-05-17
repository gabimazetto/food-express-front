import React from "react";
import {
  Form,
} from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import Divider from "../../components/Divider/Divider";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import loginImg from "../../assets/images/meninaNoteFood.png";
import logo from "../../assets/images/logoTemaClaro.png";
import "./LoginRestaurante.css";

export function LoginRestaurante() {
  return (
    <>
      <ContainerCenterMobile className="background-gradient">
        <main className="border container rounded-5 ">
      <div className="grid" >
          <div className="colTwo" >
            
                <div class="text-center">
                  <img
                    src={loginImg}
                    class="mt-4 "
                    alt="Imagem de uma mulher no computador vendo imagens de comidas"
                  />
                </div>
              </div>
                <div className="colOne">
                  <div className="px-3 py-4">
                  <img src={logo} class="img-fluid" alt="Logo do FoodExpress" />
                  
                    <Form>
                      <CustomInput
                        className="input-web"
                        type="email"
                        placeholder="Digite seu e-mail"
                        icon="bi bi-envelope-at-fill white "
                      />
                      <CustomInput
                        type="password"
                        placeholder="Digite sua senha"
                        icon="bi bi-eye-fill white "
                      />

                      <div class="d-grid gap-2 mt-4">
                        <ButtonNavigation
                          text="Login"
                          route="/cliente/home"
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
              
          </div>
      
        </main>
      </ContainerCenterMobile>
    </>
  );
}
