
import React from 'react';
import './ContainerCardImg.css';



export function ContainerCardImg({ className, children }) {
  return (
    <div className={`container-card fluid ${className}`}>
      {children}
    </div>
  );
}
