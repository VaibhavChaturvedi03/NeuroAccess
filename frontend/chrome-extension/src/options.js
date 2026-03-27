import React from 'react';
import ReactDOM from 'react-dom';
import './styles/options.css';

const Options = () => {
  return (
    <div className="options">
      <h1>AutoAccess Options</h1>
      <div className="content">
        <p>Configure your AutoAccess settings here.</p>
      </div>
    </div>
  );
};

ReactDOM.render(<Options />, document.getElementById('root'));
