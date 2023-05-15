import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import "./CustomInputIconNone.css";

export function CustomInputIconNone({ type, placeholder, value, onChange, className, label}) {
    return (
      <Form.Group className="mb-3">
        <InputGroup className="custon-input-group formulario">
          <Form.Label>{label}</Form.Label>
          <Form.Control  className={className} type={type} placeholder={placeholder}value={value} onChange={onChange} />
        </InputGroup>
      </Form.Group>
    );
  }