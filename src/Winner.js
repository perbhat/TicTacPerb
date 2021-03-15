import React from 'react';
import './Board.css';
import PropTypes from 'prop-types';

export function Winner(props) {
  const { winner } = props;
  return (
    <h1>
      {winner}
      {' '}
      WINS
      {' '}
    </h1>
  );
}

Winner.propTypes = {
  winner: PropTypes.string.isRequired,
};
export default Winner;
