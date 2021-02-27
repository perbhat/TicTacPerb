import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Box } from './Box.js'


const socket = io();

export function Board() {
    
    const [boardState, changeState] = useState(Array(9).fill(null));
    
    const[nextVal, changeNext] = useState(true);
    
    
    function onClickDiv(idx){
        const tempArr = [...boardState]
        const newVal = !nextVal
        if(boardState[idx] == null){
            tempArr[idx] = nextVal ? 'X' : 'O'
            changeNext(prevVal => newVal)
            changeState(prevList => tempArr)
        }
        socket.emit('turn', { board: tempArr, moveBool: newVal});
        console.log("Move Sent")
        
    }
        
    useEffect(() => {
        socket.on('turn', (data) => {
            console.log('Move Received')
            console.log(data)
            const currentState = data.board
            const moveState = data.moveBool
            console.log(currentState)
            changeNext(prevVal => moveState)
            changeState(prevList => currentState)
            });
         }, []);
        
    
    return (
    <div class="board">
        
        {boardState.map((item, index) => <Box value={item} onClick={()=>onClickDiv(index)}/>)}

    </div>
    );
}


