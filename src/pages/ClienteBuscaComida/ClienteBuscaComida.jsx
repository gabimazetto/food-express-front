import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./ClienteBuscaComida.css"
import { CardCardapioCliente } from "../../components/CardCardapioCliente/CardCardapioCliente";
import { Link, useParams } from "react-router-dom";


export function ClienteBuscaComida() {
    const [comidas, setComidas] = useState(null);
    const [pesquisa, setPesquisa] = useState("");
    const [comidasFiltradas, setComidasFiltradas] = useState(comidas);



    // INICIAR TABELA DE CARDÁPIO
    useEffect(() => {
        initializeTable();
    }, []);

    
    function handleUpdateData() {
        initializeTable();
    }

    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable() {
        axios
            .get(`http://localhost:3001/comidas`)
            .then((response) => {
                setComidas(response.data);
                setComidasFiltradas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // FUNÇÃO PESQUISAR POR NOME, CATEGORIA, DESCRIÇÃO E CODIGO
    const handlePesquisa = (event) => {
        const pesquisa = event.target.value.toLowerCase();
        const comidasFiltradas = comidas.filter((comida) => {
            return (
                comida.nome.toLowerCase().includes(pesquisa)   ||
                comida.categoria.toLowerCase().includes(pesquisa) ||
                comida.descricao.toLowerCase().includes(pesquisa)
            );
        });
        setPesquisa(pesquisa);
        setComidasFiltradas(comidasFiltradas);
    };

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center header-pesquisa">
                    <Form>
                        <InputGroup className="mb-3 campo-pesquisa">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar nome ou categoria ou descrição"
                                aria-label="Pesquisar nome ou categoria ou descrição"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form>
                </div>
                {comidasFiltradas === null ? (
                    <Loader />
                ) : (
                    <CardCardapioCliente
                        comidas={comidasFiltradas}
                        updateData={handleUpdateData}
                    />
                )}
            </div>
        </>
    );
}
