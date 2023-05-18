import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";



export function Favoritos() {

    const [favoritos, setFavoritos] = useState([]);
    const [comidasFavoritas, setComidasFavoritas] = useState([]);

    useEffect(() =>{
        initializeTable();
        initializeComidasTable();
    }, []);


    function initializeTable(){
        axios.get("http://localhost:3001/favoritos/restaurantes")
        .then((response) =>{
            setFavoritos(response.data);
        }).catch((error) =>{
            console.log(error);
        });
    }

    function initializeComidasTable(){
        axios.get("http://localhost:3001/favoritos/comidas")
        .then((response) =>{
            setComidasFavoritas(response.data);
        }).catch((error) =>{
            console.log(error);
        });
    }



    return(
        <>
        <div className="container">
        <h1>Restaurantes Favoritos</h1>
        {
            favoritos === null ?
            (
                <Loader />
            ):
            (            
            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Restaurantes</th>
                            <th>Ir para Restaurante</th>  
                        </tr>
                        
                    </thead>
                    <tbody>
                        {favoritos.map(favorito =>{
                            return(
                                <tr key={favorito.id}>
                                    <td>{favorito.nomeFantasia}</td>
                                    <td>
                                        <Button as={Link} to={`/restaurantes/${favorito.id}`}>
                                        <i className="bi bi-list"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
        )}
                
                <h1>Comidas Favoritas</h1>
        
        {
            comidasFavoritas === null ? 
            (
                <Loader />
            ) :
            (
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Comida</th>
                        <th>Descrição</th>
                        <th>Ir para Cardápio</th> 
                    </tr>
                    
                </thead>
                <tbody>
                    {comidasFavoritas.map(comidafavorita =>{
                        return(
                            <tr key={comidafavorita.id}>
                                <td>{comidafavorita.nome}</td>
                                <td>{comidafavorita.descricao}</td>

                                <td>
                                    <Button as={Link} to={`/restaurante/cardapio/cliente`}>
                                    <i className="bi bi-list"></i>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            )
        }

        </div>
        </>
    );
}