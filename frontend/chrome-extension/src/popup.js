import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/popup.css';

const Popup = () => {
  return (
    <div className="popup">
      <h1>NeuroAccess</h1>
      <div className="content">
        <p>Welcome to NeuroAccess!</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Popup />);
}
