import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, type, onClick }) => (
  <button onClick={onClick} type={type}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
