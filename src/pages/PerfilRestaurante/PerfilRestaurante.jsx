import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";





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
            {busca ? (
                <></>
            ) : (
                <Card className="card-restaurante">
                    <Card.Img variant="top" src=""/>
                    <Card.Body>
                        <Card.Title>{restaurante.nomeFantasia}</Card.Title>
                        <Card.Text>
                            <>
                            <b>CNPJ: </b>{restaurante.cnpj} <br />
                            <b>Email: </b>{restaurante.email} <br />
                            
                            <b>Rua: </b>{restaurante.endereco.rua} <br />
                            <b>Número: </b>{restaurante.endereco.numero} <br />
                            <b>Cidade: </b>{restaurante.endereco.cidade} <br />
                            <b>Estado: </b>{restaurante.endereco.uf} <br />
                            <b>Telefone: </b>{restaurante.telefone} <br />
                            {/* <b>Comidas:</b>{restaurante.comidas}
                            <b>Avaliações:</b>{restaurante.avaliacoes} */}
                        <Button variant="primary" as={Link} to="/restaurantes">
                            Voltar
                        </Button>
                            </>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}