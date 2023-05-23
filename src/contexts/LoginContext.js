import { createContext, useState  } from "react";


const ContextLogin = createContext();

function LoginContext({ children }){
    const [authenticated, setAuthenticated] = useState(false);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    return(
        <ContextLogin.Provider value={{ authenticated, setAuthenticated, token, config }}>
            {children}
        </ContextLogin.Provider>
    );
}

export { ContextLogin, LoginContext };