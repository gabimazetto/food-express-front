import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ButtonNavigation.css';

export function ButtonNavigation({ text, route, className, type, icon, tooltipContent }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipContent}
    </Tooltip>
  );

  return (
    <>
      {tooltipContent ? (
        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
          <Button variant="primary" onClick={handleClick} className={className} type={type}>
            {icon && <i className={icon}></i>}
            {text}
          </Button>
        </OverlayTrigger>
      ) : (
        <Button variant="primary" onClick={handleClick} className={className} type={type}>
          {icon && <i className={icon}></i>}
          {text}
        </Button>
      )}
    </>
  );
}

