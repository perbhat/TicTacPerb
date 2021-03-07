import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Box } from './Box.js'
import { Winner } from './Winner.js'




const socket = io();

export function Board(props) {
    
    const [boardState, changeState] = useState(Array(9).fill(null));
    
    const playerX = props.playerX
    const playerO = props.playerO
    
    const initialTurn = props.player == 'X' ? true : false
    
    const[canTurn, changeTurn] = useState(initialTurn)

    console.log(canTurn)
    

    
    
    function resetGame(){ //Resets board to empty array
        let temp = Array(9).fill(null)
        changeState(prevVal => temp)
        socket.emit('reset', { board: temp});
    
    }
    useEffect(() => {
        socket.on('reset', (data) => {
            
            let temp = data.board
            changeState(prev=>temp)


            });
         }, []);

    
    
    function onClickDiv(idx){ //What happens when one clicks a box
        if(boardState[idx] == null){ //Make sure that the square is not already clicked before
            if(props.player == 's' || props.player == '' || !canTurn){
                return
            }
    
            const tempArr = [...boardState]
            tempArr[idx] = props.player == 'X' ? 'X' : 'O'
            changeState(prevList => tempArr)
            socket.emit('turn', { board: tempArr});
            changeTurn(prevVal => !prevVal)
            console.log("Move Sent")
            }
        else{
            return
        }
        
    }
        
    useEffect(() => {
        socket.on('turn', (data) => {
            const currentState = data.board
            changeState(prevList => currentState)
            changeTurn(prevVal => !prevVal)
            });
         }, []);
         
    function calculateWinner(squares) { //Calculates the Winner
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
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    
    function boardIsFull(){ //Returns true of false if every element is not equal to null (meaning board is full)
        return boardState.every(element => element !== null)
        
    }
    
    const currentTurn = canTurn ? 'Your Turn' : 'Opponent\'s Turn' //Used to display first player
    
    if(calculateWinner(boardState) != null){
        
        const winner = calculateWinner(boardState) == 'X' ? playerX : playerO
        return(
            <>
            <Winner winner={winner}/>
    
            
            <button onClick={resetGame}>Play Again?</button>
            <p1>(Loser Goes First)</p1>
            </>
            
            )

    }
    
    else if(boardIsFull()){
        return (
            <>
            <h1> DRAW </h1>
            <button onClick={resetGame}>Play Again?</button>
            </>
            
            )
    }
            
    else{
        return (
            <>
            <h3>{currentTurn}</h3>
            
        <div class="board">
            
            {boardState.map((item, index) => <Box value={item} onClick={()=>onClickDiv(index)}/>)}
    
        </div>
        </>
        );
    }
}


