import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import "./CustomInput.css";

export function CustomInput({ type, placeholder, icon, value, onChange, className}) {
    return (
      <Form.Group className="mb-3">
        <InputGroup className="custon-input-group">
          <Form.Control  className={className} type={type} placeholder={placeholder}value={value} onChange={onChange} />
          <InputGroup.Text>
            <i className={icon} style={{backgroundColor: "transparent"}}></i>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
    );
  }