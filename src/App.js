import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { CadastroClienteParte1 } from "./pages/CadastroClienteParte1/CadastoClienteParte1";
import { NovoRestaurante } from "./pages/NovoRestaurante/NovoRestaurante";
import { NovaComida } from "./pages/NovaComida/NovaComida";
import { Cardapio } from "./pages/Cardapio/Cardapio";
import { EditaRestaurante } from "./pages/EditarRestaurante/EditarRestaurante";
import { EditarCliente } from "./pages/EditarCliente/EditarCliente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/novocliente" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} />
          <Route path="/novorestaurante" element={<NovoRestaurante />} />
          <Route path="/restaurante/cardapio/nova" element={<NovaComida />} />
          <Route path="/comidas" element={<Cardapio />} />
          <Route path="/editarrestaurante/:id" element={<EditaRestaurante />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
