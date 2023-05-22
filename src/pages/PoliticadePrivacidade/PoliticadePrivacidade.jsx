import noteFood from "../../assets/images/noteFood.png";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";



export function PoliticadePrivacidade() {


    return (
        <>
            <ContainerCenterMobile className="background-gradient">
                <main className="border container rounded-5 ">
                    <div className="grid" >
                        <div className="colTwo" >
                            <div className="text-center">
                                <img
                                    src={noteFood}
                                    class="mt-4"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="colOne">
                            <div className="px-3 py-4" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <h1>Política de Privacidade</h1>
                                <p>Esta Política de Privacidade descreve como coletamos, usamos, divulgamos e protegemos as informações pessoais que você fornece ao utilizar nosso website. Respeitamos a sua privacidade e estamos comprometidos em proteger as suas informações pessoais.</p>
                                <h2>Informações Coletadas</h2>
                                <p>Ao utilizar nosso website, podemos coletar as seguintes informações pessoais: <br />
                                    Nome e informações de contato, como endereço de e-mail e número de telefone, fornecidos voluntariamente por você ao preencher formulários ou entrar em contato conosco. <br />
                                    Informações de identificação, como nome de usuário e senha, quando você cria uma conta em nosso website. <br />
                                    Informações demográficas, como idade, sexo e localização geográfica, fornecidas voluntariamente por você em pesquisas ou questionários. <br />
                                    Informações de uso do website, incluindo dados de acesso, endereço IP, tipo de navegador, páginas visitadas e tempo gasto no website.
                                </p>
                                <h2>Uso das Informações</h2>
                                <p>As informações pessoais coletadas são utilizadas para os seguintes propósitos: <br />
                                    Fornecer os serviços e recursos solicitados por você. <br />
                                    Personalizar sua experiência no website e fornecer conteúdo relevante. <br />
                                    Melhorar nossos produtos, serviços e comunicações com base no feedback recebido. <br />
                                    Enviar comunicações promocionais, atualizações e informações sobre produtos e serviços, caso você tenha consentido em recebê-las. <br />
                                    Realizar pesquisas de mercado e análises para melhorar nossos produtos e serviços. <br />
                                    Cumprir obrigações legais e regulatórias. <br />
                                </p>
                                <h2>Compartilhamento de Informações</h2>
                                <p>
                                    Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias: <br />
                                    Com o seu consentimento explícito para compartilhar as informações. <br />
                                    Para cumprir obrigações legais e regulatórias. <br />
                                    Para fornecedores de serviços terceirizados que nos ajudam a operar nosso website e a prestar serviços a você, desde que eles concordem em manter suas informações pessoais confidenciais. <br />
                                </p>
                                <h2>Proteção de Informações </h2>
                                <p>
                                    Em caso de fusão, aquisição ou venda de ativos da nossa empresa, suas informações pessoais podem ser transferidas como parte da transação. <br />
                                    Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é totalmente seguro, e não podemos garantir a segurança absoluta das informações.
                                </p>
                                <h2>Cookies e Tecnologias Semelhantes</h2>
                                <p>
                                    Utilizamos cookies e tecnologias similares para coletar informações sobre o uso do website e melhorar sua experiência. Você pode optar por aceitar ou recusar o uso de cookies através das configurações do seu navegador.
                                </p>
                                <h2>Atualizações desta Política</h2>
                                <p>
                                    Podemos atualizar esta Política de Privacidade periodicamente, e quaisquer alterações serão publicadas em nosso website. É recomendável revisar regularmente esta Política para se manter informado sobre como tratamos suas informações pessoais.

                                </p>
                                <h2>Contato</h2>
                                <p>
                                    Se tiver alguma dúvida, preocupação ou solicitação relacionada à nossa Política de Privacidade ou ao tratamento de suas informações pessoais, entre em contato conosco através dos canais fornecidos em nosso website.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </ContainerCenterMobile>
        </>
    );
}