import React from 'react';
import './Board.css';

// Leaderboard component returns a table


export function LeaderBoard(props){
    const leaderBoard = props.data
    const myplayer = props.thisPlayer
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
                        {leaderBoard.map((player) =>{
                            return myplayer == player[0] ?
                            <tr><td><b>{player[0]}</b></td><td><b>{player[1]}</b></td></tr>
                            :
                            <tr><td>{player[0]}</td><td>{player[1]}</td></tr>
                        }
                

                        )}
                    </tr>
                </tbody>
            </table>
            </>
            
           
        )

}