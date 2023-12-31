import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { CadastroCliente } from "./pages/CadastroCliente/CadastroCliente";
import { CardapioRestaurante } from "./pages/CardapioRestaurante/CardapioRestaurante";
import { EditaRestaurante } from "./pages/EditarRestaurante/EditarRestaurante";
import { EditarCliente } from "./pages/EditarCliente/EditarCliente";
import { HomeRestaurante } from "./pages/HomeRestaurante/HomeRestaurante";
import { PerfilRestaurante } from "./pages/PerfilRestaurante/PerfilRestaurante";
import { AdicionarAtualizarComida } from "./pages/AdicionarAtualizarComida/AdicionarAtualizarComida";
import { LoginCliente } from "./pages/LoginCliente/LoginCliente";
import { HomeCliente } from "./pages/HomeCliente/HomeCliente";
import { CadastroRestaurante } from "./pages/CadastroRestaurante/CadastroRestaurante";
import { LoginRestaurante } from "./pages/LoginRestaurante/LoginRestaurante";
import { Restaurantes } from "./pages/Restaurantes/Restaurantes";
import { PedidosCliente } from "./pages/PedidosCliente/PedidosCliente";
import { Favoritos } from "./pages/Favoritos/Favoritos";
import { NotFound } from "./pages/NotFound/NotFound";
import { CardapioCliente } from "./pages/CardapioCliente/CardapioCliente";
import { useContext, useEffect } from "react";
import { ContextLogin } from "./contexts/LoginContext";
import { ContextClient } from "./contexts/ClientContext";
import { ContextRestaurant } from "./contexts/RestaurantContext";
import { FaleConosco } from "./pages/FaleConosco/FaleConosco";
import { FAQ } from "./pages/FAQ/FAQ";
import { PoliticadePrivacidade } from "./pages/PoliticadePrivacidade/PoliticadePrivacidade";
import { DescricaoPedidoCliente } from "./pages/DescricaoPedidoCliente/DescricaoPedidoCliente";
import { PedidosRestaurante } from "./pages/PedidosRestaurante/PedidosRestaurante";
import { ClienteBuscaComida } from "./pages/ClienteBuscaComida/ClienteBuscaComida"
import { Sobre } from "./pages/Sobre/Sobre";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute/PublicOnlyRoute";
import { PrivateRouteRestaurant } from "./components/PrivateRouteRestaurant/PrivateRouteRestaurant";
import { PrivateRouteClient } from "./components/PrivateRouteClient/PrivateRouteClient";


function App() {
  const { checkClientAuthentication } = useContext(ContextClient);
  const { checkRestaurantAuthentication } = useContext(ContextRestaurant);
  const { authenticated, token, isAuthenticated } = useContext(ContextLogin);

  useEffect(() => {
    isAuthenticated(checkClientAuthentication, checkRestaurantAuthentication);
  }, [authenticated, token]);
  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>

          {/* Rotas públicas apenas para quem não está logado na aplicação */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/" element={<Home />} />

            <Route path="/cliente/login" element={<LoginCliente />} />
            <Route path="/cliente/cadastro" element={<CadastroCliente />} />

            <Route path="/restaurante/login" element={<LoginRestaurante />} />
            <Route path="/restaurante/cadastro" element={<CadastroRestaurante />} />
          </Route>

          {/* Rotas de comum acesso entre qualquer contextos */}
          <Route path="/contato" element={<FaleConosco />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacidade" element={<PoliticadePrivacidade />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NotFound />} />
          
          {/* Rotas privadas acessíveis apenas para o Cliente */}
          <Route element={<PrivateRouteClient />}>
            <Route path="/cliente/home" element={<HomeCliente />} />
            <Route path="/cliente/perfil/:idC" element={<EditarCliente />} />
            <Route path="/cliente/listar/restaurantes" element={<Restaurantes />} />
            <Route path="/restaurante/:id" element={<PerfilRestaurante />} />
            <Route path="/cliente/restaurante/cardapio/:id" element={<CardapioCliente />} />
            <Route path="/cliente/pesquisa" element={<ClienteBuscaComida/>} />
            <Route path="/cliente/pesquisa/:categoria" element={<ClienteBuscaComida/>} />
            <Route path="/cliente/listar/favoritos" element={<Favoritos />} />
            <Route path="/cliente/pedidos" element={<PedidosCliente />} />
            <Route path="/cliente/pedidos/:id" element={<DescricaoPedidoCliente />} />
          </Route>

          {/* Rotas privadas acessíveis apenas para Restaurante */}
          <Route element={<PrivateRouteRestaurant />}>
              <Route path="/restaurante/home" element={<HomeRestaurante />}/>
              <Route path="/restaurante/cardapio" element={<CardapioRestaurante />} />  {/* Alterar a rota também no adicionar/atualizar comida*/}
              <Route path="/restaurante/cardapio/cadastro" element={<AdicionarAtualizarComida />} />         {/* Adicionar nova comida ao cardapio*/}
              <Route path="/restaurante/cardapio/item/:id" element={<AdicionarAtualizarComida />} />       {/* Atualizar comida no cardapio*/}
              <Route path="/restaurante/perfil/:idR" element={<EditaRestaurante />} />
              <Route path="/restaurante/pedidos" element={<PedidosRestaurante />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;