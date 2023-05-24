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

    async function isAuthenticated(funcaoA, funcaoB){
        if(token && !authenticated){
            try{
                funcaoA();
                funcaoB();
                setAuthenticated(true)
            } catch(error){
                console.log(error);
            }
        }
    }

    return(
        <ContextLogin.Provider value={{ authenticated, setAuthenticated, token, config, isAuthenticated }}>
            {children}
        </ContextLogin.Provider>
    );
}

export { ContextLogin, LoginContext };