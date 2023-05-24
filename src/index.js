import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app.scss";
import "./index.css";
import { ClientContext } from "./contexts/ClientContext";
import { RestaurantContext } from "./contexts/RestaurantContext";
import { LoginContext } from "./contexts/LoginContext";
import { SacolaComprasContext } from "./contexts/SacolaComprasContext";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginContext>
      <ClientContext>
        <RestaurantContext>
          <SacolaComprasContext>
            <App />
          </SacolaComprasContext>
        </RestaurantContext>
      </ClientContext>
    </LoginContext>
  </React.StrictMode>
);
