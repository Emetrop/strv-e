import React from 'react';
import PropTypes from 'prop-types';

export const buttonTypes = {
  BUTTON: 'button',
  SUBMIT: 'submit',
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
const Button = ({ children, type, onClick }) => (
  <button onClick={onClick} type={type}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf([buttonTypes.BUTTON, buttonTypes.SUBMIT]).isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => false,
};

export default Button;
