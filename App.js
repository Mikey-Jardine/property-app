import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage';
import CreateProperty from './CreateProperty';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>
          <MainPage />   
          <CreateProperty />    
      </div>
      </header>
    </div>
  );
}

export default App;
