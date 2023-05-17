
import { InputGroup, Form, Button } from "react-bootstrap";
import noteContato from "../../assets/images/noteContato.png"



export function FaleConosco() {

    return(
        <>
        <div className="container text-center mt-3">
            <h1>Fale Conosco</h1>
            <img src={noteContato} alt="" />
            <Form>
                <InputGroup className="mb-3">
                <InputGroup.Text>
                <i className="bi bi-envelope-at"></i>
                </InputGroup.Text>
                    <Form.Control
                    placeholder="Insira seu email"
                    />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>
                <i className="bi bi-pencil-square"></i>
                </InputGroup.Text>
                <Form.Control 
                as="textarea" 
                placeholder="Escreva sua mensagem/comentário" />
            </InputGroup>
            <Button className="mt-3">
                Enviar
            </Button>
            </Form>
            
        </div>
        </>
    );
}