
import { Form } from "react-bootstrap";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import contatoimg from "../../assets/images/noteContato.png";
import { FooterLogout } from "../../components/FooterLogout/FooterLogout";
import "./FaleConosco.css";
import logo from "../../assets/images/logoTemaClaro.png";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";

export function FaleConosco() {    

    return (
        <>
            <ContainerCenterMobile className="background-gradient">
                <main className="border container-fale rounded-5 ">

                    <div className="colTwoFale" >

                        <img
                            src={contatoimg}
                            class="img-fale"
                            alt="Imagem de uma mulher em um call center"
                        />

                    </div>
                    <div className="colOneFale">
                        <div className="px-5 py-4 conteudo-fale d-flex flex-column align-items-center">

                            <img src={logo} class="img-fluid logo-fale pb-5" alt="Logo do FoodExpress" />

                            

                            <Form>
                            <h1 className="pb-2">Fale Conosco</h1>
                                <CustomInput
                                    className="input-web"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    icon="bi bi-envelope-at-fill white "
                                />

                                <CustomInput
                                    className="input-web-text"
                                    type="textarea"
                                    placeholder="Escreva sua mensagem aqui..."
                                    icon="bi bi-pencil-square white"
                                />
                                

                                <ButtonNavigation
                                    text="Enviar"
                                    type="submit"
                                    className="white mt-2"
                                />

                            </Form>
                        </div>
                    </div>

                </main>
            </ContainerCenterMobile>
            <FooterLogout />
        </>
    );
}