// ClientOnlyComponent.tsx
"use client"
import React, { useState, useEffect } from 'react';

const ClientOnlyComponent: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <p>The width of the window is: {windowWidth}px</p>
    </div>
  );
};

export default ClientOnlyComponent;
