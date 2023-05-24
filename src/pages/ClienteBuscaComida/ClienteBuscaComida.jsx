import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./ClienteBuscaComida.css"
import { CardCardapioCliente } from "../../components/CardCardapioCliente/CardCardapioCliente";
import { useParams } from "react-router-dom";
import { ContextLogin } from "../../contexts/LoginContext";



export function ClienteBuscaComida() {
    const [comidas, setComidas] = useState(null);
    const [pesquisa, setPesquisa] = useState("");
    const [comidasFiltradas, setComidasFiltradas] = useState(comidas);
    const { categoria } = useParams();
    const { token } = useContext(ContextLogin);


    // INICIAR TABELA DE CARDÁPIO
    useEffect(() => {
        initializeTable();
    }, []);


    function handleUpdateData() {
        initializeTable();
    }

    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable() {
        const params = {};

        if (pesquisa) {
            params.nome = pesquisa;
        }

        if (categoria) {
            params.categoria = categoria;
        }

        axios
            .get("http://localhost:3001/comidas", { 
                params, 
                headers: {
                    Authorization: `Bearer ${token}`
                }
        })
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
                comida.nome.toLowerCase().includes(pesquisa) ||
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
                        <InputGroup className="mb-3 campo-pesquisa ">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar nome ou categoria ou descrição"
                                aria-label="Pesquisar nome ou categoria ou descrição"
                                aria-describedby="basic-addon2"
                                className="rounded mt-4"
                            />
                        </InputGroup>
                    </Form>
                    {categoria && (
                        <p>Buscando por categoria: {categoria}</p>
                    )}
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
