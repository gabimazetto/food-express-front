import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./CustomInputIconNone.css";

export function CustomInputIconNone({
  type,
  small,
  placeholder,
  value,
  onChange,
  className,
  error,
  label,
  register,
  pattern,
  title,
  min,
  max,

  as,
}) {
  return (
    <Form.Group as={as} className="mb-3">
      <InputGroup className="custon-input-group formulario">
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
          pattern={pattern}
          title={title}
          min={min}
          max={max}
        />
      </InputGroup>
      <Form.Text className="invalid-feedback">{error?.message}</Form.Text>
    </Form.Group>
  );
}
