import React from 'react';
import './App.css';
import './components/Game.css';
import Game from "./components/Game";

function App() {
  return (
    <div className="App-header">
      <div className="bg-primary px-3 my-4 rounded">Tic Tac Toe </div>
      < Game />
    </div>
  );
}

export default App;
