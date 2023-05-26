import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Card } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { toast } from "react-hot-toast";
import { ContextLogin } from "../../contexts/LoginContext";
import "./PedidosRestaurante.css";
import { ButtonNavigation } from "../../components/ButtonNavigation/ButtonNavigation";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";

export function PedidosRestaurante() {
  const [pedidos, setPedidos] = useState(null);
  const { idRes } = useContext(ContextRestaurant);
  const { config } = useContext(ContextLogin);
  const dayjs = require("dayjs");

  useEffect(() => {
    initializeTable();
    const attPagina = setInterval(() => {
      initializeTable();
    }, 10000);

    return () => clearInterval(attPagina);
  }, [idRes]);

  function initializeTable() {
    axios
      .get(`http://localhost:3001/pedidos/restaurante/${idRes}`, config)
      .then((response) => {
        const listaPedidos = response.data.map((pedido) => {
          const {
            cliente: { nome, cpf },
            enderecoPedido: { rua, numero, cep, complemento },
            items,
            restaurante: { nomeFantasia },
          } = pedido;
          return {
            ...pedido,
            cliente: { nome, cpf },
            enderecoPedido: { rua, numero, cep, complemento },
            items: items.map(({ quantidade, comida }) => ({
              quantidade,
              comida: comida?.nome,
            })),
            restaurante: { nomeFantasia },
          };
        });
        setPedidos(listaPedidos);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateStatus(pedidoId, status) {
    axios
      .put(
        `http://localhost:3001/pedidos/${pedidoId}`,
        { status: status },
        config
      )
      .then(() => {
        initializeTable();
        toast.success("Pedido atualizado!", {
          position: "bottom-right",
          duration: 2000,
        });
      })
      .catch((error) => {
        toast.error("Erro ao atualizar status do pedido.");
      });
  }

  return (
    <>
      <ContainerCenterMobile className="container-rest-pedidos">
        <section className="pedido-rest-web">
          <h1>Pedidos</h1>
          {pedidos === null ? (
            <Loader />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="align-middle">Data Pedido</th>
                  <th className="align-middle">Itens</th>
                  <th className="align-middle">Status</th>
                  <th className="align-middle">Nome Cliente</th>
                  <th className="align-middle">Rua</th>
                  <th className="align-middle">Numero</th>
                  <th className="align-middle">Editar Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => {
                  const dataPedido = dayjs(pedido.dataRegistro);
                  if (pedido.status !== "Pendente") {
                    return (
                      <tr key={pedido.id}>
                        <td className="align-middle">
                          {dataPedido.format("DD/MM/YYYY")}
                        </td>
                        <td className="align-middle">
                          {pedido.items.map((item, index) => (
                            <div key={index}>
                              <td>
                                {item.quantidade}x {item.comida}
                              </td>
                            </div>
                          ))}
                        </td>
                        <td className="align-middle p-table">
                          {pedido.status === "Aguardando confirmação" ? (
                            <p className="align-middle p-table">
                              <b className="aguardando">{pedido.status}</b>
                            </p>
                          ) : pedido.status === "Confirmado" ? (
                            <p className="align-middle p-table">
                              <b className="confirmado">{pedido.status}</b>
                            </p>
                          ) : pedido.status === "A caminho" ? (
                            <p className="align-middle p-table">
                              <b className="aCaminho">{pedido.status}</b>
                            </p>
                          ) : pedido.status === "Entregue" ? (
                            <p className="align-middle p-table">
                              <b className="entregue">{pedido.status}</b>
                            </p>
                          ) : pedido.status === "Cancelado" ? (
                            <p className="align-middle">
                              <b className="cancelado">{pedido.status}</b>
                            </p>
                          ) : null}
                        </td>
                        <td className="align-middle">{pedido.cliente.nome}</td>
                        <td className="align-middle">
                          {pedido.enderecoPedido?.rua}
                        </td>
                        <td className="align-middle">
                          {pedido.enderecoPedido?.numero}
                        </td>
                        <td className="align-middle">
                          {pedido.status === "Aguardando confirmação" ? (
                            <Button
                              className="fixed-size-button"
                              value={"Confirmado"}
                              onClick={() =>
                                updateStatus(pedido.id, "Confirmado")
                              }
                            >
                              Confirmar
                            </Button>
                          ) : pedido.status === "Confirmado" ? (
                            <Button
                              className="fixed-size-button"
                              value={"A caminho"}
                              onClick={() =>
                                updateStatus(pedido.id, "A caminho")
                              }
                            >
                              Encaminhar
                            </Button>
                          ) : pedido.status === "A caminho" ? (
                            <Button
                              className="fixed-size-button"
                              value={"Entregue"}
                              onClick={() =>
                                updateStatus(pedido.id, "Entregue")
                              }
                            >
                              {" "}
                              Finalizar
                            </Button>
                          ) : (
                            <Button className="fixed-size-button">
                              Finalizado
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  } else return null;
                })}
              </tbody>
            </Table>
          )}
        </section>
        <section className="pedido-rest-mobile">
          <h1 className="text-center">Pedidos</h1>
          <div className="row row-cols-1 row-cols-md-2 g-4 d-flex justify-content-center">
            {pedidos === null ? (
              <Loader />
            ) : (
              pedidos.map((pedido) => {
                const dataPedido = dayjs(pedido.dataRegistro);
                if (pedido.status !== "Pendente") {
                  return (
                    <div
                      className="col d-flex justify-content-center"
                      key={pedido.id}
                    >
                      <Card
                        key={pedido.id}
                        style={{ width: "18rem" }}
                        className="card-rest-pedido card-principal"
                      >
                        <Card.Body>
                          <Card.Title>
                            Data Pedido: {dataPedido.format("DD/MM/YYYY")}
                          </Card.Title>
                          {pedido.items.map((item, index) => (
                            <Card.Text key={index}>
                              {item.quantidade}x {item.comida}
                            </Card.Text>
                          ))}
                          <Card.Text>
                            Status:{" "}
                            {pedido.status === "Aguardando confirmação" ? (
                              <p className="align-middle p-table">
                                <b className="aguardando">{pedido.status}</b>
                              </p>
                            ) : pedido.status === "Confirmado" ? (
                              <p className="align-middle p-table">
                                <b className="confirmado">{pedido.status}</b>
                              </p>
                            ) : pedido.status === "A caminho" ? (
                              <p className="align-middle p-table">
                                <b className="aCaminho">{pedido.status}</b>
                              </p>
                            ) : pedido.status === "Entregue" ? (
                              <p className="align-middle p-table">
                                <b className="entregue">{pedido.status}</b>
                              </p>
                            ) : pedido.status === "Cancelado" ? (
                              <p className="align-middle">
                                <b className="cancelado">{pedido.status}</b>
                              </p>
                            ) : null}
                          </Card.Text>
                          <Card.Text>
                            Nome Cliente: {pedido.cliente.nome}
                          </Card.Text>
                          <Card.Text>
                            Rua: {pedido.enderecoPedido?.rua}
                          </Card.Text>
                          <Card.Text>
                            Número: {pedido.enderecoPedido?.numero}
                          </Card.Text>
                          {pedido.status === "Aguardando confirmação" ? (
                            <Button
                              className="text-start mt-auto"
                              value={"Confirmado"}
                              onClick={() =>
                                updateStatus(pedido.id, "Confirmado")
                              }
                            >
                              Confirmar
                            </Button>
                          ) : pedido.status === "Confirmado" ? (
                            <Button
                              className="text-start mt-auto"
                              value={"A caminho"}
                              onClick={() =>
                                updateStatus(pedido.id, "A caminho")
                              }
                            >
                              Encaminhar
                            </Button>
                          ) : pedido.status === "A caminho" ? (
                            <Button
                              className="text-start mt-auto"
                              value={"Entregue"}
                              onClick={() =>
                                updateStatus(pedido.id, "Entregue")
                              }
                            >
                              Finalizar
                            </Button>
                          ) : (
                            <Button className="text-start mt-auto">
                              Finalizado
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  );
                } else return null;
              })
            )}
          </div>
        </section>

        <div className="button-rest-pedido d-flex justify-content-start mt-3">
          <ButtonNavigation
            type="submit"
            route="/cliente/home"
            icon="white bi bi-arrow-left-circle-fill"
            tooltipContent="Voltar para a home"
          />
        </div>
      </ContainerCenterMobile>
    </>
  );
}
