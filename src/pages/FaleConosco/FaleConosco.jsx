
import { Form } from "react-bootstrap";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import contatoimg from "../../assets/images/noteContato.png";

import "./FaleConosco.css";
import { Contato } from "../../components/Contato/Contato";
import { Footer } from "../../components/Footer/Footer";


export function FaleConosco() {

    return (
        <>
            <ContainerCenterMobile className="background-gradient">
                <main className="border container-fale rounded-5 ">

                    <div className="flex" >
                        <div className="colTwo" >
                            <div className="text-center">
                                <img
                                    src={contatoimg}
                                    className="d-flex justify-content-center img-fale"
                                    alt="Imagem de uma mulher em uma central de atendimento"
                                />
                            </div>
                        </div>
                        <div className="colOne">
                        <Contato/>                   
                        </div>
                    </div>                   
                </main>
            </ContainerCenterMobile>
           <Footer/>
           </>
    );
}