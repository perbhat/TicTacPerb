import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import React, {useState, useRef} from 'react'




function App() {
  
  const inputUser = useRef(null);
  const onButtonClick = () => {
    inputUser.current.focus();
  };

  
  return (

    
    <div>

      <Board/>
    </div>
    
 

  );
}

export default App;
