import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export function Restaurantes(){

    const [restaurantes, setRestaurantes] = useState(null);
    const navigate = useNavigate();

    const clienteId = 1;

useEffect(() => {
    initializeTable();
}, []);

function initializeTable(){
    axios.get("http://localhost:3001/restaurantes")
    .then((response) =>{
        const restaurantes = response.data.map((restaurante) => {
            const { endereco: { uf, cidade, cep, rua, numero, complemento } } = restaurante;
            return { ...restaurante, endereco: { uf, cidade, cep, rua, numero, complemento } };
        });
        setRestaurantes(restaurantes);
    })
    .catch((error) =>{
        console.log(error);
    });
}

function FavRestaurante(restauranteId) {
    const data = {
        favoritar: true,
        restauranteId,
        clienteId,
    }
    axios.post("http://localhost:3001/restaurantes/favoritos", data)
    .then((response) =>{
        toast.success("Adicionado aos Favoritos", {
            position:"bottom-right", duration:2000
        });
        navigate("/restaurantes")
    }).catch((error) =>{
        toast.error("Algo deu errado", {
            position: "bottom-right", duration:2000
        });
    });
}

return (
    <div className="container">
        <h1> Restaurantes </h1>
        {
            restaurantes === null ?
            <Loader/>
            :
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome Fantasia</th>
                    <th>Cidade</th>
                    <th>Rua</th>
                    <th>Mais Detalhes</th>
                    <th>Adicionar aos Favotitos</th>

                </tr>
            </thead>
            <tbody>
                {restaurantes.map(restaurante => {
                    return (
                        <tr key={restaurante.id}>
                            <td>{restaurante.nomeFantasia}</td>
                            <td>{restaurante.endereco.cidade}</td>
                            <td>{restaurante.endereco.rua}</td>
                            <td>
                                <Button as={Link} to={`/restaurante/${restaurante.id}`}>
                                        <i className="bi bi-list-ul"></i>
                                </Button>
                            </td>
                            <td>
                                <Button type="submit" onClick={() => FavRestaurante(restaurante.id)}>
                                        <i className="bi bi-heart"></i>
                                </Button>
                                
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        }

    </div>
)


}