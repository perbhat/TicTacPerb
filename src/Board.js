import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Box } from './Box.js'


const socket = io();

export function Board(props) {
    
    const [boardState, changeState] = useState(Array(9).fill(null));
    
    const[nextVal, changeNext] = useState(true);
    

    
    
    
    
    function onClickDiv(idx){
        if(props.player == 's' || props.player == ''){
            return
        }

        const tempArr = [...boardState]
        const newVal = !nextVal
        if(boardState[idx] == null){
            tempArr[idx] = props.player == 'X' ? 'X' : 'O'
            changeNext(prevVal => newVal)
            changeState(prevList => tempArr)
        }
        socket.emit('turn', { board: tempArr, moveBool: newVal});
        console.log("Move Sent")
   
        
    }
        
    useEffect(() => {
        socket.on('turn', (data) => {
            // console.log('Move Received')
            // console.log(data)
            const currentState = data.board
            const moveState = data.moveBool
            // console.log(currentState)
            changeNext(prevVal => moveState)
            changeState(prevList => currentState)

            });
         }, []);
         
    function calculateWinner(squares) {
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
    
    function boardIsFull(){
        return boardState.every(element => element !== null)
        
    }
    
    if(calculateWinner(boardState) != null){
        return (
            
            <h1> {calculateWinner(boardState)} WINS </h1>
            
            )
    }
    
    else if(boardIsFull()){
        return (
            
            <h1> DRAW </h1>
            
            )
    }
            
    else{
        return (
            <>
        <div class="board">
            
            {boardState.map((item, index) => <Box value={item} onClick={()=>onClickDiv(index)}/>)}
    
        </div>
        </>
        );
    }
}


