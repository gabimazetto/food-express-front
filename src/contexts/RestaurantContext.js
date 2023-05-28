import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ContextLogin } from "./LoginContext";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

const ContextRestaurant = createContext();

function RestaurantContext({ children }) {

    const { token, authenticated, setAuthenticated } = useContext(ContextLogin);
    const [idRes, setIdRes] = useState(null);
    const [emailRes, setEmailRes] = useState(null);
    const [roleRes, setRoleRes] = useState(null);


    async function handleLogin(data) {
        try {
            await axios.post(`http://localhost:3001/restaurantes/login`, data)
                .then(async (response) => {
                    toast.success("Bem-Vindo(a)", {
                        position: "bottom-right",
                        duration: 4000,
                    });
                    const { token } = response.data;
                    localStorage.setItem("token", token);
                    handleDecodeRestaurante(token);
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

    async function handleDecodeRestaurante(token) {
        try {
            const decoded = await jwtDecode(token);
            if(decoded.role === "restaurante"){
                setIdRes(decoded.id);
                localStorage.setItem("id", decoded.id);
                setEmailRes(decoded.email);
                setRoleRes(decoded.role);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function LogoffRestaurant() {
        localStorage.removeItem("token");
        setAuthenticated(false);
        setIdRes(null);
        localStorage.removeItem("id");
        setEmailRes(null);
        setRoleRes(null);
    }

    async function checkRestaurantAuthentication(){
        if(token && authenticated === false){
            try{
                await handleDecodeRestaurante(token);
            } catch (error){
                console.log(error);
            }
        }
    }

    return (
        <ContextRestaurant.Provider value={{ idRes, emailRes, roleRes, handleDecodeRestaurante, handleLogin, LogoffRestaurant, checkRestaurantAuthentication }}>
            {children}
        </ContextRestaurant.Provider>
    );
}

export { ContextRestaurant, RestaurantContext };