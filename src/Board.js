import React, { useState, useEffect } from 'react';
import './Board.css';

import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { Box } from './Box';
import { Winner } from './Winner';

const socket = io();

function calculateWinner(squares) {
// Calculates the Winner
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (
      squares[a]
      && squares[a] === squares[b]
      && squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export function Board(props) {
  const { player, playerX, playerO } = props;

  const [boardState, changeState] = useState(Array(9).fill(null));

  const initialTurn = player === 'X';
  console.log(initialTurn);
  console.log(player);
  const thisPlayer = player === 'X' ? playerX : playerO;

  const [canTurn, changeTurn] = useState(initialTurn);

  let winner = null;
  if (calculateWinner(boardState) === 'X') {
    winner = playerX;
  } else if (calculateWinner(boardState) === 'O') {
    winner = playerO;
  }

  function resetGame() {
    // Resets board to empty array
    const temp = Array(9).fill(null);
    changeState(temp);
    socket.emit('reset', { board: temp });
  }
  useEffect(() => {
    socket.on('reset', (data) => {
      const temp = data.board;
      changeState(temp);
    });
  }, []);

  useEffect(() => {
    if (thisPlayer === winner) {
      socket.emit('update_score', { user: thisPlayer, score: 1 });
    } else if (winner !== null && thisPlayer !== winner) {
      socket.emit('update_score', { user: thisPlayer, score: -1 });
    }
  }, [winner]);

  function onClickDiv(idx) {
    // What happens when one clicks a box
    if (boardState[idx] === null) {
      // Make sure that the square is not already clicked before
      if (props.player === 's' || player === '' || !canTurn) {
        return;
      }

      const tempArr = [...boardState];
      tempArr[idx] = player === 'X' ? 'X' : 'O';
      changeState(tempArr);
      socket.emit('turn', { board: tempArr });
      // changeTurn((prevVal) => !prevVal);
    }
  }

  useEffect(() => {
    socket.on('turn', (data) => {
      const currentState = data.board;
      changeState(currentState);
      changeTurn((c) => !c);
    });
  }, []);

  function boardIsFull() {
    // Returns true of false if every element is not equal to null (meaning board is full)
    return boardState.every((element) => element !== null);
  }

  const currentTurn = canTurn ? 'Your Turn' : "Opponent's Turn"; // Used to display first player

  if (calculateWinner(boardState) != null) {
    return (
      <>
        <Winner winner={winner} />

        <button type="button" onClick={resetGame}>Play Again?</button>
        <p1>(Loser Goes First)</p1>
      </>
    );
  } if (boardIsFull()) {
    return (
      <>
        <h1> DRAW </h1>
        <button type="button" onClick={resetGame}>Play Again?</button>
      </>
    );
  }
  return (
    <>
      <h3>{currentTurn}</h3>

      <div className="board">
        {boardState.map((item, index) => (
          <Box value={item} onClick={() => onClickDiv(index)} />
        ))}
      </div>
    </>
  );
}

Board.propTypes = {
  player: PropTypes.string.isRequired,
  playerX: PropTypes.string.isRequired,
  playerO: PropTypes.string.isRequired,
};

export default Board;
