import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import React, {useState, useRef, useEffect} from 'react'
import io from 'socket.io-client';


const socket = io();

function App() {
  const [userMap, updateUsers] = useState({
    playerX: '',
    playerO: '',
    spectators: []
  });
  const inputUser = useRef(null);
  
  function onButtonClick(){
    var copy = {...userMap}
    const user = inputUser.current.value
    if(copy.playerX == ''){
      copy.playerX = user
    }
    else if(copy.playerO == ''){
      copy.playerO = user
    }
    else{
      let specs = [...copy.spectators, user]
      copy.spectators = specs
    }
    updateUsers(copy);
    
    socket.emit('login', {users: copy});
    console.log(copy);
    console.log("emitted");
    
  };
  
  useEffect(() => {
    socket.on('login', (data) => {
        console.log('login registered')
        updateUsers(data.users);
        console.log(data.users.spectators)
        });
     }, []);

  

  
  return (

    
    <div>
      <input type='text' ref={inputUser}/>
      <button onClick={onButtonClick}>Set the user for this tab </button>
      <Board/>
    </div>
    
 

  );
}

export default App;
