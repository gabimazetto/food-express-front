import { Form, InputGroup } from "react-bootstrap";
import "./CustomInputPreco.css"





export function CustomInputPreco({ type, placeholder, icon, value, onChange, className, label }) {


    return (
        <Form.Group className="mb-3 input-preco">
            <Form.Label>{label}</Form.Label>
            <InputGroup className="custon-input-group mt-2">
                <InputGroup.Text className="white">
                    R$
                </InputGroup.Text>
                <Form.Control className={className} type={type} placeholder={placeholder} value={value} onChange={onChange} />

            </InputGroup>
        </Form.Group>
    )
}