import React from 'react';
import './Box.css';


export function Box(props) {
    
    
    return (
        <div class="box" onClick={props.onClick}>{props.value}</div>
        
        );
}

