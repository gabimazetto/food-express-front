import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./CustomInput.css";

export function CustomInput({
  label,
  small,
  type,
  placeholder,
  icon,
  value,
  onChange,
  register,
  validation,
  error,
  className,
  toggleType, // adicionamos esta função
  iconType // e este estado
}) {
  return (
    <Form.Group className="mb-3">
      <InputGroup className="custon-input-group">
        <Form.Label>{label}</Form.Label>
        <small className="form-text text-muted">
          {small}
        </small>
        <Form.Control
          className={className || (error && "is-invalid")}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...register}
        />
        <InputGroup.Text onClick={toggleType} className="input-custom-label">
          <i className={icon} style={{ backgroundColor: "transparent" }}></i>
        </InputGroup.Text>
        <Form.Text className="invalid-feedback">{error?.message}</Form.Text>
      </InputGroup>
    </Form.Group>
  );
}
