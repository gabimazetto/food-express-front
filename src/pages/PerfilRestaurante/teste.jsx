import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";





export function PerfilRestaurante() {

    const [restaurante, setRestaurante] = useState([]);
    const [busca, setBusca] = useState(true);
    const { id } = useParams();

    useEffect(() =>{
        const detalhe = async () =>{
            try {
                const detalhes = await 
                axios.get(`http://localhost:3001/restaurantes/${id}`)
                setRestaurante(detalhes.data);
                setBusca(false);
            }catch(error) {
                console.log(error);
            }
        };
        detalhe();
    }, [id]);






    return(
        <div className="container">
            <h1>{restaurante.nomeFantasia}</h1>
            
            {busca ? (
                <></>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>CNPJ</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            {/*<th>Comidas</th>
                            <th>Avaliações</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={restaurante}>
                            <td>{restaurante.cnpj}</td>
                            <td>{restaurante.email}</td>
                            <td>{restaurante.telefone}</td>
                            <td>{restaurante.endereco.rua}</td>
                            {/* <td>{restaurante.comidas}</td>
                            <td>{restaurante.avaliacoes}</td> */}


                        </tr>
                    </tbody>
                </Table>
            )}
        </div>
    );
}