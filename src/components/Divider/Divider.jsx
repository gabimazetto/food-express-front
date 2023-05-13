import React from 'react';
import './Divider.css';  // Certifique-se de importar o arquivo CSS

function Divider({ className, children }) {
  return (
    <div className={`divider ${className}`}>
      <p>{children}</p>
    </div>
  );
}

export default Divider;
