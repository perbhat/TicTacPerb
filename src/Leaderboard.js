import React from 'react';
import './Board.css';
import PropTypes from 'prop-types';

// Leaderboard component returns a table

export function LeaderBoard(props) {
  const { data, thisPlayer } = props;
  const leaderBoard = data;
  const myplayer = thisPlayer;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="2">LeaderBoard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {leaderBoard.map((player) => (myplayer === player[0] ? (
              <tr>
                <td>
                  <b>{player[0]}</b>
                </td>
                <td>
                  <b>{player[1]}</b>
                </td>
              </tr>
            ) : (
              <tr>
                <td>{player[0]}</td>
                <td>{player[1]}</td>
              </tr>
            )))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
LeaderBoard.propTypes = {
  thisPlayer: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(Array).isRequired,
};
export default LeaderBoard;
