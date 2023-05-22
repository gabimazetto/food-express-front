import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import meninaNoteFood from "../../assets/images/meninaNoteFood.png";



export function Sobre() {
    return(
        <>
                    <ContainerCenterMobile className="background-gradient">
                <main className="border container rounded-5 ">
                    <div className="grid" >
                        <div className="colTwo" >
                            <div className="text-center">
                                <img
                                    src={meninaNoteFood}
                                    class="mt-4"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="colOne">
                            <div className="px-5 py-3"style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <h1>Sobre nós</h1>
                                <h2>Bem-vindo ao FoodExpress!</h2>
                                <p>Somos uma plataforma online que facilita o registro e entrega de comida, trazendo a melhor experiência gastronômica diretamente para a sua porta. Combinamos a conveniência de um aplicativo intuitivo e o prazer de desfrutar de refeições deliciosas no conforto da sua casa.</p>
                                <p>Nossa missão é conectar você aos melhores restaurantes e estabelecimentos culinários da região, oferecendo uma ampla variedade de opções para todos os gostos e necessidades alimentares. Acreditamos que comida é muito mais do que apenas uma necessidade básica; é uma forma de arte que deve ser apreciada e compartilhada.</p>
                                <h2>Por que escolher o FoodExpress?</h2>
                                <p><b>Variedade excepcional:</b> Trabalhamos em parceria com uma extensa rede de restaurantes renomados e chefs talentosos, oferecendo uma seleção diversificada de pratos e culinárias. Dos sabores tradicionais aos mais exóticos, temos algo para satisfazer todos os paladares.</p>
                                <p><b>Facilidade de uso:</b> Nosso aplicativo é projetado para ser simples e amigável, garantindo que você possa navegar facilmente pelos menus, personalizar seus pedidos e acompanhar o progresso da entrega com apenas alguns toques na tela.</p>
                                <p><b>Entrega rápida e confiável:</b> Trabalhamos arduamente para garantir que suas refeições cheguem até você frescas e no prazo. Nossa equipe de entregadores dedicados está sempre pronta para levar seu pedido até a sua porta de forma eficiente e segura.</p>
                                <p><b>Opções personalizadas:</b>Com o FoodExpress, você tem a liberdade de personalizar suas refeições de acordo com suas preferências. Seja vegetariano, vegano, sem glúten ou com restrições alimentares específicas, temos opções para atender às suas necessidades.</p>
                                <p><b>Excelência em atendimento ao cliente: </b>Valorizamos a satisfação dos nossos clientes e estamos sempre prontos para ajudar. Nossa equipe de suporte está disponível 24 horas por dia, 7 dias por semana, para responder a perguntas, resolver problemas e garantir que você tenha a melhor experiência possível.</p>
                                <h5>Estamos muito felizes por você ter escolhido o FoodExpress como sua plataforma de registro e entrega de comida. Explore nosso menu, faça seu pedido e deixe-nos cuidar do resto. Prepare-se para uma experiência gastronômica incrível!</h5>
                                <p>A equipe FoodExpress</p>
                                </div>
                            </div>
                        </div>
                </main>
            </ContainerCenterMobile>
        </>
    );
}