import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ContextLogin } from "../../contexts/LoginContext";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextRestaurant } from "../../contexts/RestaurantContext";


export function PublicOnlyRoute(){
    const { authenticated, token } = useContext(ContextLogin);
    const { idCli } = useContext(ContextClient);
    const { idRes } = useContext(ContextRestaurant);

    if(authenticated && token){
        if(idCli){
            console.log(idCli);
            return <Navigate to='/cliente/home' replace />
        }else if(idRes){
            return <Navigate to='/restaurante/home' replace />
        }
        return <Navigate to='/' replace />
    }
    return(
        <Outlet />
    )
}