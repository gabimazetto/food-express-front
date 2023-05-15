import axios from "axios";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import "./Cardapio.css"
import { CardCardapioRestaurante } from "../../components/CardCardapioRestaurante/CardCardapioRestaurante";



export function Cardapio() {
    const [comidas, setComidas] = useState(null);
    const [pesquisa, setPesquisa] = useState('');
    const [comidasFiltradas, setComidasFiltradas] = useState(comidas);


    
    // INICIAR TABELA DE CARDÁPIO
    useEffect(() => {
        initializeTable();
    }, []);

    // FUNÇÃO INICIAR TABELA DE CARDÁPIO
    function initializeTable() {
        axios.get("http://localhost:3001/comidas")
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
        const comidasFiltradas = comidas.filter(
            (comida) => {
                return (
                    comida.codigo.toLowerCase().includes(pesquisa) ||
                    comida.nome.toLowerCase().includes(pesquisa) ||
                    comida.categoria.toLowerCase().includes(pesquisa) ||
                    comida.descricao.toLowerCase().includes(pesquisa)
                );
            }
        );
        setPesquisa(pesquisa);
        setComidasFiltradas(comidasFiltradas);
    }

    function handleUpdateData() {
        initializeTable();
    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="cardapio-titulo">Cardápio</h1>
                    <Form>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar nome ou categoria"
                                aria-label="Pesquisar nome ou categoria"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form>
                </div>
                {comidasFiltradas === null ? (
                    <Loader />
                ) : (
                    <CardCardapioRestaurante
                        comidas={comidasFiltradas}
                        updateData={handleUpdateData}
                    />
                )}
            </div>
        </>
    );
}