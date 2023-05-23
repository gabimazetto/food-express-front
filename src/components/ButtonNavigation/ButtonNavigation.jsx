import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ButtonNavigation.css';

export function ButtonNavigation({ text, route, className, type, icon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Button variant="primary" onClick={handleClick} className={className} type={type}>
      {icon && <i className={icon}></i>}
      {text}
    </Button>
  );
}
