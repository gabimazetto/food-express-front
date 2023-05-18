
import {Button,Form, InputGroup,} from "react-bootstrap";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import contatoimg from "../../assets/images/noteContato.png";
import { FooterLogout } from "../../components/FooterLogout/FooterLogout";

export function FaleConosco() {


    return (
        <>
            <ContainerCenterMobile className="background-gradient">
                <main className="border container rounded-5 ">
                    <div className="grid" >
                        <div className="colTwo" >
                            <div className="text-center">
                                <img
                                    src={contatoimg}
                                    class="mt-4 "
                                    alt="Imagem de uma mulher confusa"
                                />
                            </div>
                        </div>
                        <div className="colOne">
                            <div className="px-3 py-4">
                                <h1>Fale Conosco</h1>
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <i className="bi bi-envelope-at"></i>
                                            </InputGroup.Text>
                                            <Form.Control placeholder="Insira seu email" />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <i className="bi bi-pencil-square"></i>
                                            </InputGroup.Text>
                                            <Form.Control as="textarea" placeholder="Escreva sua mensagem/comentário" />
                                        </InputGroup>
                                        <Button className="mt-3 mb-5">
                                            Enviar
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                </main>
            </ContainerCenterMobile>
            <FooterLogout/>
        </>
    );
}