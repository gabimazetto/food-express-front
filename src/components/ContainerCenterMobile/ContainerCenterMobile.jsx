
import React from 'react';
import './ContainerCenterMobile.css';



export function ContainerCenterMobile({ className, children }) {
  return (
    <div className={`centered-container fluid ${className}`}>
      {children}
    </div>
  );
}
