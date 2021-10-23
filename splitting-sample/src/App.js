import React from 'react';
import logo from './logo.svg';
import './App.css';
import notify from './notify';

function App() {
  const onClick = ()=>{
    notify();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}> Hello React1!</p>
      </header>
    </div>
  );
}

export default App;
