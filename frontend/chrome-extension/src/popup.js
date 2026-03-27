import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/popup.css';

const Popup = () => {
  return (
    <div className="popup">
      <h1>AutoAccess</h1>
      <div className="content">
        <p>Welcome to AutoAccess!</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Popup />);
}
