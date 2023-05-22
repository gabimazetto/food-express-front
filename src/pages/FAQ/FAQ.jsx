import { Accordion } from "react-bootstrap";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import faqimg from "../../assets/images/meninaDuvida.png";

import "./FAQ.css"

export function FAQ() {


    return (
        <>
            <ContainerCenterMobile className="background-gradient">
                <main className="border container rounded-5 ">
                    <div className="grid" >
                        <div className="colTwo" >
                            <div className="text-center">
                                <img
                                    src={faqimg}
                                    className="mt-4 "
                                    alt="Imagem de uma mulher confusa"
                                />
                            </div>
                        </div>
                        <div className="colOne">
                            <div className="px-3 py-4">
                                <h1>Dúvidas Frequentes (FAQ)</h1>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header> <b>Como cadastrar como cliente?</b> </Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil neque sapiente temporibus nisi omnis molestias architecto maiores   blanditiis. Laborum magnam aliquam, labore asperiores suscipit praesentium fugiat mollitia deleniti fugit corrupti.
                                            </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header> <b>Como cadastrar como restaurante?</b> </Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla amet ipsum deleniti, aperiam optio fuga aut provident! Sed, ea. Quod iusto error earum modi asperiores dolorem, deleniti libero nostrum repudiandae facilis, nemo iure excepturi illo non neque nobis pariatur culpa, magnam amet!
                                            </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header> <b>Como cadastrar uma refeição?</b> </Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla amet ipsum deleniti, aperiam optio fuga aut provident! Sed, ea. Quod iusto error earum modi asperiores dolorem, deleniti libero nostrum repudiandae facilis.
                                            </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header> <b>Como adicionar um item à sacola?</b> </Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla amet ipsum deleniti, aperiam optio fuga aut provident! Sed, ea. Quod iusto error earum modi asperiores dolorem, deleniti libero nostrum repudiandae facilis.
                                            </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header> <b>Como finalizar um pedido?</b> </Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla amet ipsum deleniti, aperiam optio fuga aut provident! Sed, ea. Quod iusto error earum modi asperiores dolorem, deleniti libero nostrum repudiandae facilis.
                                            </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </main>
            </ContainerCenterMobile>
        </>
    );
}