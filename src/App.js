import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { CadastroClienteParte1 } from "./pages/CadastroClienteParte1/CadastoClienteParte1";
import { Cardapio } from "./pages/Cardapio/Cardapio";
import { EditaRestaurante } from "./pages/EditarRestaurante/EditarRestaurante";
import { EditarCliente } from "./pages/EditarCliente/EditarCliente";
import { HomeRestaurante } from "./pages/HomeRestaurante/HomeRestaurante";
import { PerfilRestaurante } from "./pages/PerfilRestaurante/PerfilRestaurante";
import { AdicionarAtualizarComida } from "./pages/AdicionarAtualizarComida/AdicionarAtualizarComida";
import { Login } from "./pages/Login/Login";
import { Clientes } from "./pages/Clientes/Clientes";
import { CadastroRestaurante } from "./pages/CadastroRestaurante/CadastroRestaurante";
import { Restaurantes } from "./pages/Restaurantes/Restaurantes";
import { CardCardapioCliente } from "./components/CardCardapioCliente/CardCardapioCliente";

function App() {
  // const clienteId = JWT.getLoggedInClientId(); => ver como isso acontece no jwt ===== clienteId={clienteId}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
        dev
          <Route path="/login" element={<Login />} />
          <Route path="/clientes" element={<Clientes />} />

        main
          <Route path="/novocliente" element={<NovoCliente />} />
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
        </Route>
        <Route path="/cadastrocliente" element={<CadastroClienteParte1 />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
