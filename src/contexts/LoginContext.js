import { createContext, useState  } from "react";


const ContextLogin = createContext();

function LoginContext({ children }){
    const [authenticated, setAuthenticated] = useState(false);
    const token = localStorage.getItem("token");

    return(
        <ContextLogin.Provider value={{ authenticated, setAuthenticated, token }}>
            {children}
        </ContextLogin.Provider>
    );
}

export { ContextLogin, LoginContext };