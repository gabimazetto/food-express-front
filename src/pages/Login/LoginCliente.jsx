import React from "react";
import {Col, Row} from "react-bootstrap"
import { Container, Card, Form, Button } from "react-bootstrap";
import loginImg  from "../../assets/images/meninaNoteFood.png";
import "./LoginCliente.css";

export function LoginCliente() {
  return (
    <>
    <div className="container" >
      <main  className="border border-primary conteudo">
        <Row>
          <Col>
            <div class="text-center">
                <img src={loginImg} class="img fluid" alt="Imagem de uma mulher no computador vendo imagens de comidas"/>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
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

