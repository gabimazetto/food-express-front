import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Offcanvas, OffcanvasBody, OffcanvasHeader } from "react-bootstrap";
import { ContextClient } from "../../contexts/ClientContext";
import { ContextLogin } from "../../contexts/LoginContext";
import { ContextSacolaCompras } from "../../contexts/SacolaComprasContext";
import "./CarrinhoCompras.css";
import { CustomInputIconNone } from "../CustomInputIconNone/CustomInputIconNone";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContainerCardImg } from "../../components/ContainerCardImg/ContainerCardImg";
import imgSacolaTriste from "../../assets/images/sacolaTriste.png";

export function CarrinhoCompras() {
    const { idCli } = useContext(ContextClient);
    const { config } = useContext(ContextLogin);
    const { attItem, delApenasUmItem } = useContext(ContextSacolaCompras);
    const [canvasDados, setCanvasDados] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModalCanvas, setShowModalCanvas] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [pedidoId, setPedidoId] = useState(null);
    const [lock, setLock] = useState(true);
    const [pedidoIdState, setPedidoIdState] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            status: "Aguardando confirmação",
        },
    });

    const initializeTable = useCallback(() => {
        axios
            .get(`http://localhost:3001/pedidos/${idCli}`, config)
            .then((response) => {
                setPedidoIdState(response.data[0].id);

                const pedidoStatus = response.data.map((pedido) => {
                    const { items, cliente, enderecoPedido, restaurante } = pedido;
                    return {
                        ...pedido,
                        pedido: { ...pedido },
                        items: items.map(({ id, quantidade, comida }) => ({
                            id,
                            quantidade,
                            comida: { ...comida },
                        })),
                        cliente: {
                            id: cliente.id,
                            nome: cliente.nome,
                            telefone: cliente.telefone,
                            cpf: cliente.cpf,
                            dataNascimento: cliente.dataNascimento,
                            endereco: {
                                id: cliente.endereco.id,
                                uf: cliente.endereco.uf,
                                cidade: cliente.endereco.cidade,
                                cep: cliente.endereco.cep,
                                rua: cliente.endereco.rua,
                                numero: cliente.endereco.numero,
                                complemento: cliente.endereco.complemento,
                                restauranteId: cliente.endereco.restauranteId,
                            },
                        },
                        enderecoPedido: {
                            id: enderecoPedido.id,
                            rua: enderecoPedido.rua,
                            bairro: enderecoPedido.bairro,
                            numero: enderecoPedido.numero,
                            cep: enderecoPedido.cep,
                            complemento: enderecoPedido.complemento,
                        },
                        restaurante: {
                            nomeFantasia: restaurante.nomeFantasia,
                            cnpj: restaurante.cnpj,
                            telefone: restaurante.telefone,
                        },
                    };
                });
                setCanvasDados(pedidoStatus[0]);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`http://localhost:3001/clientes/${idCli}`, config)
            .then((response) => {
                const {
                    endereco: { uf, cidade, cep, rua, numero, complemento },
                } = response.data;
                reset({
                    endereco: { uf, cidade, cep, rua, numero, complemento },
                });
            });
    }, [idCli, config, reset]);

    useEffect(() => {
        initializeTable();
    }, [idCli, config, reset, initializeTable]);

    const handleClick = () => {
        handleShowOffcanvas();
        initializeTable();
    };

    const handleClose = () => setShowModalCanvas(false);

    const handleShow = (itemId, pedidoId) => {
        setItemId(itemId);
        setPedidoId(pedidoId);
        setShowModalCanvas(true);
    };

    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
    };

    const handleShowOffcanvas = () => {
        setShowOffcanvas(true);
    };

    const diminuirItens = (index) => {
        const updateCanvasDados = { ...canvasDados };
        if (updateCanvasDados.items[index].quantidade > 1) {
            updateCanvasDados.items[index].quantidade -= 1;
            setCanvasDados(updateCanvasDados);
            attItem(
                updateCanvasDados.items[index].comida.id,
                updateCanvasDados.id,
                updateCanvasDados.items[index].id,
                updateCanvasDados.items[index].quantidade
            );
        } else {
            handleShow(updateCanvasDados.items[index].id);
        }
    };

    const deletar = async (itemId, pedidoId) => {
        delApenasUmItem(itemId);
        handleClose();
        handleCloseOffcanvas();
    };

    const aumentarItens = async (index) => {
        const updateCanvasDados = { ...canvasDados };
        const pedidoId = updateCanvasDados.id;

        const quantidade = updateCanvasDados.items[index].quantidade;
        const novaQuantidade =
            quantidade === null || quantidade === undefined ? 1 : quantidade + 1;
        updateCanvasDados.items[index].quantidade = novaQuantidade;
        setCanvasDados(updateCanvasDados);
        attItem(
            updateCanvasDados.items[index].comida.id,
            pedidoId,
            updateCanvasDados.items[index].id,
            novaQuantidade
        );
    };

    const cupom = 0.0;
    const frete = 7.5;

    const calcularPrecoTotal = () => {
        let precoTotal = 0;
        canvasDados?.items?.forEach(({ comida }, index) => {
            precoTotal += comida?.preco * canvasDados.items[index].quantidade;
        });
        return precoTotal.toFixed(2);
    };

    const calcularSubtotal = () => {
        const precoTotal = parseFloat(calcularPrecoTotal());
        return (precoTotal + frete).toFixed(2);
    };

    const calcularTotal = () => {
        const subtotal = parseFloat(calcularSubtotal());
        return (subtotal - cupom).toFixed(2);
    };

    function onSubmit(data) {
        const {
            status,
            metodoPagamento,
            endereco: { cep, complemento, numero, rua },
        } = data;

        axios
            .put(
                `http://localhost:3001/pedidos/${pedidoIdState}`,
                {
                    status,
                    metodoPagamento,
                    enderecoPedido: {
                        cep,
                        rua,
                        numero,
                        complemento,
                    },
                },
                config
            )
            .then((response) => {
                console.log(data);
                toast.success("Pedido enviado para produção", {
                    position: "bottom-right",
                    duration: 2000,
                });
                navigate("/cliente/pedidos");
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    duration: 2000,
                });
                console.log(error);
            });
    }

    return (
        <div>
            <Modal show={showModalCanvas} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza de que deseja excluir o item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary button-cancelar-modal" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="secondary" onClick={() => deletar(itemId, pedidoId)}>
                        Exluir item
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className=" display-block">
                <Button
                    className="button-size-canvas"
                    variant="primary"
                    style={{ cursor: "pointer" }}
                    onClick={handleClick}
                >
                    <i
                        class="bi bi-cart icone-carrinho-compras text-light"
                        icone-carrinho-compras
                    ></i>
                </Button>
            </div>
            <div>
                <Offcanvas
                    placement="end"
                    show={showOffcanvas}
                    onHide={handleCloseOffcanvas}
                >
                    {canvasDados && canvasDados.items && canvasDados.items.length > 0 ? (
                        <>
                            <header closeButton className="header-canvas-pedido">
                                <Offcanvas.Title>Seu pedido</Offcanvas.Title>
                                <h1>{canvasDados?.restaurante?.nomeFantasia}</h1>
                            </header>
                            <Offcanvas.Body>
                                <div className="vertical-row-canvas"></div>
                                <div className="mt-3">Descrição pedido:</div>
                                {canvasDados.items.map((item, index) => (
                                    <div className="preco-nome-canvas" key={item.id}>
                                        <div className="input-preco-canvas">
                                            <button
                                                className="btn btn-sm btn-primary diminuir-button"
                                                onClick={() => diminuirItens(index)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="quantidade-input-canvas"
                                                value={item?.quantidade}
                                                min="1"
                                                max="200"
                                                onChange={(event) => {
                                                    const value = Number(event.target.value);
                                                    if (!isNaN(value) && value >= 1) {
                                                        const updateCanvasDados = { ...canvasDados };
                                                        updateCanvasDados.items[index].quantidade = value;
                                                        setCanvasDados(updateCanvasDados);
                                                        attItem(
                                                            item.comida.id,
                                                            canvasDados.id,
                                                            item.id,
                                                            value
                                                        );
                                                    }
                                                }}
                                            />
                                            <button
                                                className="btn btn-sm btn-primary  aumentar-button"
                                                onClick={() => aumentarItens(index)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <ul className="lista-canvas">
                                            <li key={index}>{item?.comida.nome}</li>
                                        </ul>
                                        <button
                                            className="trash-canvas"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => deletar(item.id, canvasDados.id)}
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                ))}
                                <div className="vertical-row-canvas mt-3"></div>
                                <div className="mt-3">
                                    <div className="pedido-total-canvas">
                                        <p>Preço:</p>
                                        <p>R$ {calcularPrecoTotal()}</p>
                                    </div>
                                    <div className="pedido-total-canvas">
                                        <p>Frete:</p>
                                        <p>R$ {frete.toFixed(2)}</p>
                                    </div>
                                    <div className="pedido-total-canvas">
                                        <p>Subtotal:</p>
                                        <p>R$ {calcularSubtotal()}</p>
                                    </div>
                                    <div className="pedido-total-canvas">
                                        <p>Cupom:</p>
                                        <p>R$ {cupom.toFixed(2)}</p>
                                    </div>
                                    <div className="vertical-row-canvas mt-2"></div>
                                    <div className="pedido-total-canvas">
                                        <p>
                                            <b>Total:</b>
                                        </p>
                                        <p>
                                            <b>R$ {calcularTotal()}</b>
                                        </p>
                                    </div>
                                </div>
                                <div className="vertical-row-canvas  mt-3"></div>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        value="Aguardando confirmação"
                                        type="hidden"
                                        {...register("status")}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Label className="d-flex mt-3">
                                            Método de Pagamento
                                        </Form.Label>
                                        <Form.Select
                                            className="select-cadastro"
                                            {...register("metodoPagamento", {
                                                required: "Escolha uma forma de pagamento válida",
                                            })}
                                        >
                                            <option value="Cartão de crédito">
                                                Cartão de crédito
                                            </option>
                                            <option value="Cartão de débito">Cartão de débito</option>
                                            <option value="Dinheiro">Dinheiro</option>
                                            <option value="PIX">PIX</option>
                                            <option value="VR">VR</option>
                                            <option value="VA">VA</option>
                                            <option value="Carteira Digital">Carteira Digital</option>
                                        </Form.Select>
                                        {errors.metodoPagamento && (
                                            <Form.Text className="invalid-feedback">
                                                {errors.metodoPagamento.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                    <div className="mb-3">
                                        <p>Está fora do seu endereço?</p>
                                        <Form.Check
                                            type="checkbox"
                                            label="Sim"
                                            onChange={() => setLock(!lock)}
                                        />
                                    </div>
                                    <label className="form-label">CEP</label>
                                    <CustomInputIconNone
                                        type="text"
                                        pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                                        title="Formato: 12345-123 ou 12345678"
                                        register={register("endereco.cep", {
                                            required: "O CEP é obrigatório.",
                                            maxLength: {
                                                value: 9,
                                                message: "Limite de 9 caracteres.",
                                            },
                                        })}
                                        error={errors.endereco?.cep}
                                        disabled={lock ? "disabled" : ""}
                                    />
                                    <div className="mb-3">
                                        <label className="form-label">Rua</label>
                                        <CustomInputIconNone
                                            type="text"
                                            register={register("endereco.rua", {
                                                required: "A rua é obrigatória",
                                            })}
                                            error={errors.endereco?.rua}
                                            disabled={lock ? "disabled" : ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Número</label>
                                        <CustomInputIconNone
                                            type="text"
                                            register={register("endereco.numero", {
                                                required: "O número é obrigatório",
                                            })}
                                            error={errors.endereco?.numero}
                                            disabled={lock ? "disabled" : ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Complemento</label>
                                        <CustomInputIconNone
                                            type="text"
                                            register={register("endereco.complemento")}
                                            disabled={lock ? "disabled" : ""}
                                        />
                                    </div>
                                    <div className="d-grid gap-2 col-12 flex-fill">
                                        <Button
                                            type="submit"
                                            className="white button_cadastro mt-5"
                                        >
                                            Finalizar Pedido
                                        </Button>
                                    </div>
                                </Form>
                            </Offcanvas.Body>
                        </>
                    ) : (
                        <>

                            <OffcanvasHeader>
                                <h1>Sacola vazia</h1>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <ContainerCardImg className="card-carrinho">
                                    <img
                                        src={imgSacolaTriste}
                                        className="mt-4"
                                        alt="Imagem de uma sacola vazia e triste"
                                    />
                                </ContainerCardImg>
                            </OffcanvasBody>


                        </>
                    )}
                </Offcanvas>
            </div>
        </div>
    );
}
