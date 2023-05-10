import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { NovoRestaurante } from "./pages/NovoRestaurante/NovoRestaurante";
import { AdicionarComida } from "./pages/AdicionarComida/AdicionarComida";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/novocliente" element={<NovoCliente />} />
          <Route path="/novorestaurante" element={<NovoRestaurante />} />
          <Route path="/restaurante/cardapio/nova" element={<AdicionarComida/>}/>
        </Route>        
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
