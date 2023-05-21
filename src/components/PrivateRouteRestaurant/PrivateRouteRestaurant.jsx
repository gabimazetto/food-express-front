import { Navigate, Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import { ContextLogin } from "../../contexts/LoginContext";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextRestaurant } from "../../contexts/RestaurantContext";


export function PrivateRouteRestaurant(){
    const { authenticated, token } = useContext(ContextLogin);
    const { idR } = useParams();
    const { roleCli } = useContext(ContextClient);
    const { idRes, roleRes } = useContext(ContextRestaurant);

    if(!authenticated || !token){
        return <Navigate to="/" replace />
    } else if(roleCli && !roleRes){
        return <Navigate to="/cliente/home" replace />
    } else if(roleRes && idR && Number(idR) !== idRes){
        return <Navigate to="/restaurante/home" replace />
    }
    return <Outlet />
}