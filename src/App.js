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


function App() {
  const { idCli, emailCli, roleCli, handleDecodeCliente } = useContext(ContextClient);
  const { idRes, emailRes, roleRes, handleDecodeRestaurante } = useContext(ContextRestaurant);
  const { authenticated, setAuthenticated } = useContext(ContextLogin);



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && authenticated === false){
      if(idCli !== null && emailCli !== null && roleCli === "cliente"){
        handleDecodeCliente(token);
        setAuthenticated(true);
      } else if(idRes !== null && emailRes !== null && roleRes === "restaurante"){
        handleDecodeRestaurante(token);
        setAuthenticated(true);
      }
    } 
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/contato" element={<FaleConosco />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacidade" element={<PoliticadePrivacidade />} />



          <Route path="/cliente/login" element={<LoginCliente />} />
          <Route path="/restaurante/login" element={<LoginRestaurante />} />


          <Route path="/cliente/home" element={<HomeCliente />} />
          <Route path="/cliente/cadastro" element={<CadastroCliente />} />
          <Route path="/cliente/perfil/:id" element={<EditarCliente />} />
          <Route path="/cliente/listar/restaurantes" element={<Restaurantes />} />
          <Route path="/cliente/restaurante/cardapio/:id" element={<CardapioCliente />} />
          <Route path="/cliente/pesquisa" element={<ClienteBuscaComida/>} />
          <Route path="/cliente/listar/favoritos" element={<Favoritos />} />
          <Route path="/cliente/pedidos" element={<PedidosCliente />} />
          <Route path="/cliente/pedidos/:id" element={<DescricaoPedidoCliente />} />
            
          <Route path="/restaurante/cadastro" element={<CadastroRestaurante />} />
          <Route path="/restaurante/home" element={<HomeRestaurante />}/>
          <Route path="/restaurante/cardapio/" element={<CardapioRestaurante />} />  {/* Alterar a rota também no adicionar/atualizar comida*/}
          <Route path="/restaurante/cardapio/cadastro" element={<AdicionarAtualizarComida />} />         {/* Adicionar nova comida ao cardapio*/}
          <Route path="/restaurante/cardapio/item/:id" element={<AdicionarAtualizarComida />} />       {/* Atualizar comida no cardapio*/}
          <Route path="/restaurante/:id" element={<PerfilRestaurante />} />
          <Route path="/restaurante/perfil/:id" element={<EditaRestaurante />} />
          <Route path="/restaurante/pedidos" element={<PedidosRestaurante />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;