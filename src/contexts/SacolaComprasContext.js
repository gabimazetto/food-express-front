import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ContextClient } from './ClientContext';
import { ContextLogin } from './LoginContext';

const ContextSacolaCompras = createContext();

function SacolaComprasContext({ children }) {
    const { config } = useContext(ContextLogin);
    const { idCli } = useContext(ContextClient);
    const dayjs = require('dayjs');
    const today = dayjs();
    const dataRegistro = today.format('YYYY-MM-DD');

    const [itensSacola, setItensSacola] = useState([]);

    const novoItem = (comidaId, pedidoId, itemId) => {
        const dataItems = {
            quantidade: 1,
            comidaId: comidaId,
            pedidoId: pedidoId,
        };
        axios
            .post('http://localhost:3001/itens', dataItems, config)
            .then((response) => {
                const novoItem = dataItems;
                setItensSacola((prevItens) => [...prevItens, novoItem]);
                toast.success('Item adicionado!', {
                    position: 'bottom-right',
                    duration: 2000,
                });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: 'bottom-right',
                    duration: 2000,
                });
                console.log(error);
            });
    };

    const attItem = (comidaId, pedidoId, itemId, quantidadeItem) => {
        const novaQuantidade = quantidadeItem;
        const dataItems = {
            quantidade: novaQuantidade,
            comidaId: comidaId,
            pedidoId: pedidoId,
        };
        axios
            .put(`http://localhost:3001/itens/${itemId}`, dataItems, config)
            .then((response) => {
                const itemAtualizado = response.data; // Obtém o item atualizado do servidor
                const novoItensSacola = itensSacola.map((item) => {
                    if (item.id === itemId) {
                        return itemAtualizado;
                    }
                    return item;
                });
                setItensSacola(novoItensSacola);
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: 'bottom-right',
                    duration: 2000,
                });
                console.log(error);
            });
    };
    

    const delPedido = (pedidoId) => {
        axios
            .delete(`http://localhost:3001/pedidos/${pedidoId}`, config)
            .then(() => { })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'bottom-center',
                    duration: 2000,
                });
            });
    };

    //deletar TODOS itens do pedido
    const delItens = (pedidoId) => {
        axios
            .delete(`http://localhost:3001/itens/pedido/${pedidoId}`, config)
            .then(() => { })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'bottom-center',
                    duration: 2000,
                });
            });
    };

    //deletar APENAS UM item do pedido
    const delApenasUmItem = (itemid) => {
        axios
            .delete(`http://localhost:3001/itens/${itemid}`, config)
            .then(() => { 
                toast.success('Item deletado!', {
                    position: 'bottom-right',
                    duration: 2000,
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'bottom-center',
                    duration: 2000,
                });
            });
    };

    const addPedidoItem = (restauranteId, comidaId) => {
        const dataPedido = {
            dataRegistro: dataRegistro,
            status: 'Pendente',
            clienteId: idCli,
            restauranteId: restauranteId,
            metodoPagamento: 'Dinheiro',
            enderecoPedido: {
                rua: 'Rua São Paulo',
                numero: '10',
                cep: '15600-000',
                complemento: 'Casa',
            },
        };

        axios
            .post('http://localhost:3001/pedidos', dataPedido, config)
            .then((response) => {
                const pedidoId = response.data.id;
                const novoItem = 1;
                const dataItems = {
                    quantidade: novoItem,
                    comidaId: comidaId,
                    pedidoId: pedidoId,
                };

                axios
                    .post('http://localhost:3001/itens', dataItems, config)
                    .then((response) => {
                        setItensSacola((prevItens) => [...prevItens, dataItems]);
                        toast.success('Item adicionado!', {
                            position: 'bottom-right',
                            duration: 2000,
                        });
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message, {
                            position: 'bottom-right',
                            duration: 2000,
                        });
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'bottom-center',
                    duration: 2000,
                });
            });
    };

    const deletar = (pedidoId, restauranteId, comidaId) => {
        delItens(pedidoId);
        delPedido(pedidoId);
        addPedidoItem(restauranteId, comidaId);
    };

    return (
        <ContextSacolaCompras.Provider
            value={{
                itensSacola,
                attItem,
                delPedido,
                novoItem,
                addPedidoItem,
                delItens,
                deletar,
                delApenasUmItem
            }}
        >
            {children}
        </ContextSacolaCompras.Provider>
    );
}

export { SacolaComprasContext, ContextSacolaCompras };
