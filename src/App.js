import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import React, {useState, useRef, useEffect} from 'react'
import io from 'socket.io-client';
import { LeaderBoard } from './Leaderboard.js';


const socket = io();

function App() {
  
  const [thisUser, updateUser] = useState('') //Tells whether player is X or O
  const [userName, updateName] = useState('') //Store's player's username
  
  const [userMap, updateUsers] = useState({
    playerX: '',
    playerO: '',
    spectators: []
  });
  
  const [leaderBoard, updateLeaderBoard] = useState(null);
  
  
  
  const inputUser = useRef(''); //Hook to take value from the textbox
  
  
  const [displayToggle, showLeaderBoard] = useState(false);
  
  const u = thisUser == 'X'? userMap.playerX : userMap.playerO
  
  function onLeaderClick(){
    showLeaderBoard(prev => !prev)
  }

     
    
    
  
  
  useEffect(() => {
  socket.on('getleaderboard', (data) => {
      console.log('getting Leaderboard')
      console.log(data.players)
      updateLeaderBoard(prevBoard => data.players)
      });
   }, []);
   
  
  
  
  
  
  function onButtonClick(){ //Allows users to log into Application
    if(inputUser.current.value != ''){
      var copy = {...userMap}
      const user = inputUser.current.value

      if(copy.playerX == ''){
        copy.playerX = user
        updateUser(oldUser => 'X')
      }
      else if(copy.playerO == ''){
        copy.playerO = user
         updateUser(oldUser => 'O')
      }
      else{
        let specs = [...copy.spectators, user]
        copy.spectators = specs
        updateUser(oldUser => 's')
      }
      updateUsers(prev=>copy);
      updateName(prev=>user)
      
      
      
      
      
      socket.emit('login', {users: copy, currentUser: user});
      console.log(copy);
      console.log("emitted");
    }
    
  };
  
  useEffect(() => {
    socket.on('login', (data) => {
        console.log('login registered')
        updateUsers(data.users);
        console.log(data.users.spectators)
        });
     }, []);
     
     
     
     
     
     
     
  
  
  if(thisUser == ''){
    return(
      <div class='wrapper-input'>
        <div>
        <input type='text' ref={inputUser} placeholder='username' required/>
        <div style={{paddingTop: 10}}><button onClick={onButtonClick}><h3>Log In</h3></button></div>
        </div>
      
      </div>

      )
    
  }
  
  else if(userMap.playerX == '' || userMap.playerO == ''){
    return(
      <div class='wrapper'>
        <div>
          <h3>PlayerX: {userMap.playerX}</h3>
          <h3>PlayerO: {userMap.playerO}</h3>
          <h3>Spectators:</h3>
          {userMap.spectators.map((item) => <h3>{item}, </h3>)}
        </div>
        
      <div style={{paddingTop: 10}}><button onClick={onLeaderClick}><h3>Leaderboard</h3></button></div>
      {displayToggle && <LeaderBoard thisPlayer={u} data={leaderBoard}/>}

        
      </div>
      ) 
  }
  
  
  
  else{
    

        return (
  
      <div class='wrapper-small'>
        <div>
          <h3>PlayerX: {userMap.playerX}</h3>
          <h3>PlayerO: {userMap.playerO}</h3>
          <div class='spec'>
          <h2>Spectators: </h2>
          
          {userMap.spectators.map((item, index) => (<h2>{ (index ? ', ': '') + item }</h2>))}
          </div>
    
          <Board playerX={userMap.playerX} playerO={userMap.playerO} player={thisUser} />

          
        </div>
      <div style={{paddingTop: 10}}><button onClick={onLeaderClick}><h3>Leaderboard</h3></button></div>
      {displayToggle && <LeaderBoard thisPlayer={u} data={leaderBoard}/>}
        
        
        
        
        
        
      </div>
      
   
  
    );

    
    
  }
  }

export default App;
