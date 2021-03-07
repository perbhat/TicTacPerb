import React from 'react';
import './Board.css';




export function LeaderBoard(props){
    const leaderBoard = props.data
    return(
        
        <>
        <table>
            <thead>
                <tr>
                    <th colspan="2">The table header</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {leaderBoard.map((player) => <tr><td>{player[0]}</td><td>{player[1]}</td></tr>)}
                </tr>
            </tbody>
        </table>
        </>
        
       
        )

}