import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

export function Restaurantes(){

    const [restaurantes, setRestaurantes] = useState(null);

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
                    <th>Numero</th>
                </tr>
            </thead>
            <tbody>
                {restaurantes.map(restaurante => {
                    return (
                        <tr key={restaurante.id}>
                            <td>{restaurante.nomeFantasia}</td>
                            <td>{restaurante.endereco.cidade}</td>
                            <td>{restaurante.endereco.rua}</td>
                            <td>{restaurante.endereco.numero}</td>
                            <td className="d-flex gap-2">
                                {/* <Button>
                                    <i className="bi bi-trash-fill"></i>
                                </Button> */}
                                <Button as={Link} to={`/restaurantes/${restaurante.id}`}>
                                    <i className="bi bi-pencil-fill"></i>
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