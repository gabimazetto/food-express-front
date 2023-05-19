import { createContext, useState  } from "react";


const ContextLogin = createContext();

function LoginContext({ children }){
    const [authenticated, setAuthenticated] = useState(false);




    return(
        <ContextLogin.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </ContextLogin.Provider>
    );
}

export { ContextLogin, LoginContext };