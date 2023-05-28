import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ContextLogin } from "./LoginContext";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

const ContextClient = createContext();

function ClientContext({ children }) {

    const { token, authenticated, setAuthenticated } = useContext(ContextLogin);
    const [idCli, setIdCli] = useState(null);
    const [emailCli, setEmailCli] = useState(null);
    const [roleCli, setRoleCli] = useState(null);


    async function handleLogin(data) {
        try {
            await axios.post(`http://localhost:3001/clientes/login`, data)
                .then(async (response) => {
                    toast.success("Bem-Vindo(a)", {
                        position: "bottom-right",
                        duration: 4000,
                    });
                    const { token } = response.data;
                    localStorage.setItem("token", token);
                    handleDecodeCliente(token);
                    setAuthenticated(true);
                })
                .catch((error) => {
                    toast.error(`Um erro ocorreu: ${error.response.data.msg}`, {
                        position: "bottom-right",
                        duration: 4000,
                    });
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDecodeCliente(token) {
        try {
            const decoded = await jwtDecode(token);
            if(decoded.role === "cliente"){
                setIdCli(decoded.id);
                localStorage.setItem("id", decoded.id);
                setEmailCli(decoded.email);
                setRoleCli(decoded.role);
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    function LogoffClient() {
        localStorage.removeItem("token");
        setAuthenticated(false);
        setIdCli(null);
        localStorage.removeItem("id");
        setEmailCli(null);
        setRoleCli(null);
    }

    async function checkClientAuthentication(){
        if(token && authenticated === false){
            try{
                await handleDecodeCliente(token);
            } catch (error){
                console.log(error);
            }
        }
    }

    return (
        <ContextClient.Provider value={{ idCli, emailCli, roleCli, handleDecodeCliente, handleLogin, LogoffClient, checkClientAuthentication }}>
            {children}
        </ContextClient.Provider>
    );
}

export { ContextClient, ClientContext };