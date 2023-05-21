import axios from "axios";
import { createContext, useContext, useState  } from "react";
import { ContextLogin } from "./LoginContext";

const ContextRestaurant = createContext();

function RestaurantContext({ children }){
    
    const { setAuthenticated } = useContext(ContextLogin);
    const [idRes, setIdRes] = useState(null);
    const [emailRes, setEmailRes] = useState(null);
    const [roleRes, setRoleRes] = useState(null);
    

    async function handleLogin(data){
        try{
            await axios.post(`http://localhost:3001/restaurantes/login`, data)
                .then( async (response) => {
                    const { token } = response.data;
                    localStorage.setItem("token", token);
                    handleDecodeRestaurante(token);
                    setAuthenticated(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch(error){
            console.log(error);
        }

    }

    async function handleDecodeRestaurante(token){
        try{
            const decoded = await axios.get(`http://localhost:3001/restaurantes/home`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIdRes(decoded.data.id);
            setEmailRes(decoded.data.email);
            setRoleRes(decoded.data.role);

        }catch(error){
            console.log(error);
        }
    }

    function LogoffRestaurant(){
        localStorage.removeItem("token");
        setAuthenticated(false);
        setIdRes(null);
        setEmailRes(null);
        setRoleRes(null);
    }

    return(
        <ContextRestaurant.Provider value={{ idRes, emailRes, roleRes, handleDecodeRestaurante, handleLogin, LogoffRestaurant }}>
            {children}
        </ContextRestaurant.Provider>
    );
}

export { ContextRestaurant, RestaurantContext };