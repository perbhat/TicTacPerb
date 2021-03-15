import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Board } from './Board';
import { LeaderBoard } from './Leaderboard';

const socket = io();

function App() {
  const [thisUser, updateUser] = useState(''); // Tells whether player is X or O
  const [userMap, updateUsers] = useState({
    playerX: '',
    playerO: '',
    spectators: [],
  });

  const [leaderBoard, updateLeaderBoard] = useState(null);
  console.log(leaderBoard);
  const inputUser = useRef(''); // Hook to take value from the textbox

  const [displayToggle, showLeaderBoard] = useState(false);

  const u = thisUser === 'X' ? userMap.playerX : userMap.playerO;

  function onLeaderClick() {
    showLeaderBoard((prev) => !prev);
  }

  useEffect(() => {
    socket.on('getleaderboard', (data) => {
      // console.log('getting Leaderboard');
      // console.log(data.players);
      updateLeaderBoard(data.players);
    });
  }, []);

  function onButtonClick() {
    // Allows users to log into Application
    if (inputUser.current.value !== '') {
      const copy = { ...userMap };
      const user = inputUser.current.value;

      if (copy.playerX === '') {
        copy.playerX = user;
        updateUser('X');
      } else if (copy.playerO === '') {
        copy.playerO = user;
        updateUser('O');
      } else {
        const specs = [...copy.spectators, user];
        copy.spectators = specs;
        updateUser('s');
      }
      updateUsers(copy);
      socket.emit('login', { users: copy, currentUser: user });
    }
  }

  useEffect(() => {
    socket.on('login', (data) => {
      console.log('login registered');
      updateUsers(data.users);
      console.log(data.users);
    });
  }, []);

  if (thisUser === '') {
    return (
      <div className="wrapper-input">
        <div>
          <input type="text" ref={inputUser} placeholder="username" required />
          <div style={{ paddingTop: 10 }}>
            <button type="button" onClick={onButtonClick}>
              <h3>Log In</h3>
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (userMap.playerX === '' || userMap.playerO === '') {
    return (
      <div className="wrapper">
        <div>
          <h3>
            PlayerX:
            {userMap.playerX}
          </h3>
          <h3>
            PlayerO:
            {userMap.playerO}
          </h3>
          <h3>Spectators:</h3>
          {userMap.spectators.map((item) => (
            <h3>
              {item}
              ,
              {' '}
            </h3>
          ))}
        </div>

        <div style={{ paddingTop: 10 }}>
          <button type="button" onClick={onLeaderClick}>
            <h3>Leaderboard</h3>
          </button>
        </div>
        {displayToggle && <LeaderBoard thisPlayer={u} data={leaderBoard} />}
      </div>
    );
  }
  return (
    <div className="wrapper-small">
      <div>
        <h3>
          PlayerX:
          {userMap.playerX}
        </h3>
        <h3>
          PlayerO:
          {userMap.playerO}
        </h3>
        <div className="spec">
          <h2>Spectators: </h2>

          {userMap.spectators.map((item, index) => (
            <h2>{(index ? ', ' : '') + item}</h2>
          ))}
        </div>
        <div data-testid="tictac" className="Board">
          <Board
            playerX={userMap.playerX}
            playerO={userMap.playerO}
            player={thisUser}
          />
        </div>
      </div>
      <div style={{ paddingTop: 10 }}>
        <button type="button" onClick={onLeaderClick}>
          <h3>Leaderboard</h3>
        </button>
      </div>
      {displayToggle && <LeaderBoard thisPlayer={u} data={leaderBoard} />}
    </div>
  );
}

export default App;
