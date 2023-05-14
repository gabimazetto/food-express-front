import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import "./ButtonNavigation"

export  function ButtonNavigation({ text, route, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Button variant="primary" onClick={handleClick} className={className}>
      {text}
    </Button>
  );
}


