import { CardPedidoCliente } from "../../components/CardPedidoCliente/CardPedidoCliente";
import "./PedidosCliente.css";




export function PedidosCliente() {

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="pedidos-cliente-titulo mt-4">Histórico de pedidos</h1>
            </div>
            <CardPedidoCliente />
        </div>
    )
}