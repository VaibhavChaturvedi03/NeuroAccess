import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/options.css';

const Options = () => {
  return (
    <div className="options">
      <h1>NeuroAccess Options</h1>
      <div className="content">
        <p>Configure your NeuroAccess settings here.</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Options />);
}
