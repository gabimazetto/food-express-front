import React from 'react';
import "./FAQ.css";



export function FAQ() {


    return (
        <>
            <div className="container-principal-faq centered-container-secundarias">
                <h1 className="tituloPrincipalfaq tituloPrincipalfaqDesktop">Dúvidas Frequentes</h1>
                <main className="border-secundaria container rounded-5">
                    <div className="grid " >
                        <div className="colOne imagem-faq">
                            <div className="conteudo-faq">
                                <h2><b>Como cadastrar como cliente?</b> </h2>
                                    
                                       Acesse nosso site ou aplicativo <br />
                                       Clique em Cadastrar-se como Cliente <br />
                                       Preencha as informações solicitadas, como nome, endereço de e-mail e senha. <br />
                                       Confirme os dados fornecidos e conclua o cadastro. <br />
                                    

                                <h2><b>Como cadastrar como restaurante?</b> </h2>
                                    
                                       Acesse nosso site ou aplicativo <br />
                                       Clique em Cadastrar-se como Restaurante <br />
                                       Preencha as informações solicitadas, como nome, endereço de e-mail e senha. <br />
                                       Confirme os dados fornecidos e conclua o cadastro. <br />
                                    
                                        
                                <h2><b>Como cadastrar uma refeição?</b></h2> 
                                    
                                       Faça login na sua conta de restaurante. <br />
                                       Selecione a opção de adicionar nova refeição <br />
                                       Preencha os detalhes da refeição, como nome, descrição, preço e ingredientes. <br />
                                       Adicione uma imagem da refeição, se possível. <br />
                                       Salve as alterações feitas. <br />
                                    

                                <h2><b>Como adicionar um item à sacola?</b> </h2>
                                    
                                       Navegue pelo cardápio ou lista de produtos disponíveis. <br />
                                       Encontre o item desejado. <br />
                                       Clique no botão "Adicionar à sacola". <br />
                                       Escolha a quantidade desejada do item. <br />
                                       Continue navegando ou prossiga para o processo de finalização do pedido. <br />
                                    

                                <h2><b>Como finalizar um pedido?</b></h2>
                                    
                                       Verifique os itens adicionados à sua sacola. <br />
                                       Selecione a opção "Finalizar pedido"  <br />
                                       Revise os detalhes do pedido, como endereço de entrega e forma de pagamento. <br />
                                       Confirme as informações e clique em "Confirmar pedido" <br />
                                       Aguarde a confirmação do pedido e o prazo de entrega estimado. <br />
                                    
                                        
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
