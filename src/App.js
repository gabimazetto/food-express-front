import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { CadastroCliente } from "./pages/CadastroCliente/CadastroCliente";
import { CadastroClienteParte1 } from "./pages/CadastroClienteParte1/CadastoClienteParte1";
import { Cardapio } from "./pages/Cardapio/Cardapio";
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
import { CardCardapioCliente } from "./components/CardCardapioCliente/CardCardapioCliente";
import { Favoritos } from "./pages/Favoritos/Favoritos";
import { PedidosCliente } from "./pages/PedidosCliente/PedidosCliente";


function App() {
  // const clienteId = JWT.getLoggedInClientId(); => ver como isso acontece no jwt ===== clienteId={clienteId}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
        dev
          <Route path="/cliente/login" element={<LoginCliente />} />
          <Route path="/restaurante/login" element={<LoginRestaurante />} />          
        main
          <Route path="/novocliente" element={<NovoCliente />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} />
          <Route path="/cadastrostaurante" element={<CadastroRestaurante />} />
          <Route path="/restaurante" element={<HomeRestaurante/>}/>
          <Route path="/restaurante/cardapio" element={<Cardapio />} />
          <Route path="/restaurante/cardapio/cliente" element={<CardCardapioCliente />} />
          <Route path="/restaurante/cardapio/nova" element={<AdicionarAtualizarComida />} />         {/* Adicionar nova comida ao cardapio*/}
          <Route path="/restaurante/cardapio/item/:id" element={<AdicionarAtualizarComida/>}/>       {/* Atualizar comida no cardapio*/}
          <Route path="/restaurantes" element={<Restaurantes />} />
          <Route path="/restaurantes/:id" element={<PerfilRestaurante />} />
          <Route path="/editar/restaurante/:id" element={<EditaRestaurante />} />
          <Route path="/editarrestaurante/:id" element={<EditaRestaurante />} />


          <Route path="/cliente/home" element={<HomeCliente />} />
          <Route path="/cliente/cadastro" element={<CadastroCliente />} />
          <Route path="/cliente/perfil/:id" element={<EditarCliente />} />
          <Route path="/cliente/listar/restaurantes" element={<Restaurantes />} />
          <Route path="/cliente/pedidos" element={<PedidosCliente/>} />
          <Route path="/restaurante/cadastro" element={<CadastroRestaurante />} />
          <Route path="/restaurante/home" element={<HomeRestaurante/>}/>
          <Route path="/restaurante/id/cardapio" element={<Cardapio />} />  {/* Alterar a rota também no adicionar/atualizar comida*/}
          <Route path="/restaurante/cardapio/cadastro" element={<AdicionarAtualizarComida />} />         {/* Adicionar nova comida ao cardapio*/}
          <Route path="/restaurante/cardapio/item/:id" element={<AdicionarAtualizarComida/>}/>       {/* Atualizar comida no cardapio*/}          
          <Route path="/restaurante/:id" element={<PerfilRestaurante />} />
          <Route path="/restaurante/perfil/:id" element={<EditaRestaurante />} />

        </Route>
        <Route path="/cadastrocliente" element={<CadastroClienteParte1 />} />         {/* manter essa ou a da linha 30*/}
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
