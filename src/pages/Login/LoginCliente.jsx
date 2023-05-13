import React from "react";
import { Container, Card, Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import loginImg  from "../../assets/images/meninaNoteFood.png";
import "./LoginCliente.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import Divider from "../../components/Divider/Divider";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";

const styles = {
  pageStyle: {
    background: ' linear-gradient(34deg, rgba(255,255,255,1) 23%, rgba(240,96,0,1) 85%)',
    minHeight: '100vh' ,

  },
};

export function LoginCliente() {
  return (
    <>
    <ContainerCenterMobile className="background-gradient" >
    
        
      <main className="border conteudo rounded-5 ">
        
        <Row>
          <Col>
            <div class="text-center">
                <img src={loginImg} class="img fluid mt-4 " alt="Imagem de uma mulher no computador vendo imagens de comidas"/>
            </div>
            <div className="px-3 py-4" >
            <Form>

              <CustomInput type="email" placeholder="Digite seu e-mail" icon="bi bi-envelope-at-fill white "/>
              <CustomInput type="password" placeholder="Digite sua senha" icon="bi bi-eye-fill white "/>  

              <div class="d-grid gap-2 mt-4">              
              <ButtonNavigation text="Login" route="/" className="white"/>
              </div>
              </Form>
              <Divider>OU</Divider>          
              
              <ButtonNavigation text="Seja nosso cliente, cadastre-se aqui" route="/" className="my-button-not-filled"/>

              <ButtonNavigation text="Seja nosso parceiro, cadastre-se aqui" route="/" className="my-button-not-filled"/>
           
            </div>
          </Col>
          {/* <Col>2 of 2</Col> */}
        </Row>
        
      </main>
      </ContainerCenterMobile>
   
    </>
  );
}

