import React from 'react';
import './Box.css';
import PropTypes from 'prop-types';

export function Box(props) {
  const { onClick, value } = props;

  return (

    <div role="button" className="box" onClick={onClick} onKeyPress={onClick} tabIndex={0}>
      {value}
    </div>
  );
}

Box.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};
Box.defaultProps = { value: '' };

export default Box;
