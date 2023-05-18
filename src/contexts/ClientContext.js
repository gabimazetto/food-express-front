import axios from "axios";
import { createContext, useContext, useState  } from "react";
import { ContextLogin } from "./LoginContext";

const ContextClient = createContext();

function ClientContext({ children }){
    
    const { setAuthenticated } = useContext(ContextLogin);
    const [idCli, setIdCli] = useState(null);
    const [emailCli, setEmailCli] = useState(null);
    const [roleCli, setRoleCli] = useState(null);
    

    async function handleLogin(data){
        try{
            await axios.post(`http://localhost:3001/clientes/login`, data)
                .then( async (response) => {
                    const { token } = response.data;
                    localStorage.setItem("token", token);
                    handleDecodeCliente(token);
                    setAuthenticated(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch(error){
            console.log(error);
        }

    }

    async function handleDecodeCliente(token){
        try{
            const decoded = await axios.get(`http://localhost:3001/clientes/home`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIdCli(decoded.data.id);
            setEmailCli(decoded.data.email);
            setRoleCli(decoded.data.role);

        }catch(error){
            console.log(error);
        }
    }

    function LogoffClient(){
        localStorage.removeItem("token");
        setAuthenticated(false);
        setIdCli(null);
        setEmailCli(null);
        setRoleCli(null);
    }

    return(
        <ContextClient.Provider value={{ idCli, emailCli, roleCli, handleDecodeCliente, handleLogin, LogoffClient }}>
            {children}
        </ContextClient.Provider>
    );
}

export { ContextClient, ClientContext };