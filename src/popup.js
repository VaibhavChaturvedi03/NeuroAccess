import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<Popup />, document.getElementById('root'));
