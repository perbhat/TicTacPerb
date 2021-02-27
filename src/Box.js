import React from 'react';
import './Board.css';


export function Box(props) {
    
    
    return (
        <div class="box" onClick={props.onClick}>{props.value}</div>
        
        );
}

