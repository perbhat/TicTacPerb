import React from 'react';
import './Board.css';

// Leaderboard component returns a table


export function LeaderBoard(props){
    const leaderBoard = props.data
        return(
            
            <>
            <table>
                <thead>
                    <tr>
                        <th colspan="2">LeaderBoard</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {leaderBoard.map((player) =>
                
                        <tr><td>{player[0]}</td><td>{player[1]}</td></tr>

                        
                        )}
                    </tr>
                </tbody>
            </table>
            </>
            
           
        )

}