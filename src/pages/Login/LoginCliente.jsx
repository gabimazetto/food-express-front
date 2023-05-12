import React from "react";
import { Container, Card, Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import loginImg  from "../../assets/images/meninaNoteFood.png";
import "./LoginCliente.css";

export function LoginCliente() {
  return (
    <>
     <div className="container" >
        
      <main fluid className="border conteudo rounded-5">
        <Row>
          <Col>
            <div class="text-center">
                <img src={loginImg} class="img fluid mt-4 " alt="Imagem de uma mulher no computador vendo imagens de comidas"/>
            </div>
            <div className="px-3 py-4" >
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
                <Form.Control  type="email" placeholder="Digite seu e-mail" /> 
                <InputGroup.Text>
                        <i class="bi bi-envelope-at-fill white" style={{backgroundColor: "transparent"}} ></i>
                    </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup>
                <Form.Control type="password" placeholder="Digite sua senha" />
                <InputGroup.Text>
                        <i class="bi bi-lock-fill white" style={{backgroundColor: "transparent"}} ></i>
                    </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <div class="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
              </div>

              <div className="mt-3 mb-2 d-flex flex-wrap" >
                <div className="line-left" ></div>
                <p>OU</p>
                <div id="line-right"></div>
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
                <Form.Control  type="email" placeholder="Seja nosso cliente, cadastre-se aqui" /> 
                <InputGroup.Text>
                        <i class="bi bi-envelope-at-fill white" style={{backgroundColor: "transparent"}} ></i>
                    </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup>
                <Form.Control type="password"  placeholder="Seja nosso parceiro, cadastre seu restaurante aqui" />
                <InputGroup.Text>
                        <i class="bi bi-lock-fill white" style={{backgroundColor: "transparent"}} ></i>
                    </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Form>
            </div>
          </Col>
          {/* <Col>2 of 2</Col> */}
        </Row>
      </main>
      </div>
      {/* <div  className="" id="#background-gradient" >
    <Container fluid className="d-flex justify-content-center align-items-center border " style={{ minHeight: "75vh" }}>
     
        
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      
    </Container>
    </div> */}
    </>
  );
}

