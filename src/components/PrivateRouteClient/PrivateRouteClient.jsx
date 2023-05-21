import { Navigate, Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import { ContextLogin } from "../../contexts/LoginContext";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { ContextClient } from "../../contexts/ClientContext";


export function PrivateRouteClient(){
    const { authenticated, token } = useContext(ContextLogin);
    const { idC } = useParams();
    const { roleRes } = useContext(ContextRestaurant);
    const { idCli, roleCli } = useContext(ContextClient);

    if(!authenticated || !token){
        return <Navigate to="/" replace />
    } else if(roleRes && !roleCli){
        return <Navigate to="/restaurante/home" replace />
    } else if(roleCli && idC && Number(idC) !== idCli){
        return <Navigate to="/cliente/home" replace />
    }
    return <Outlet />
}