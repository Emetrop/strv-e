import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './styles.css';

export const buttonSizeTypes = {
  NORMAL: 'normal',
  LARGE: 'large',
};

export const buttonColorTypes = {
  GREY: 'grey',
  GREEN: 'green',
  RED: 'red',
};

export const buttonTypes = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  LINK: 'link',
};

const Button = ({ children, type, onClick, color, size, url }) => {
  const classes = classnames({
    button: true,
    'button--normal': size === buttonSizeTypes.NORMAL,
    'button--large': size === buttonSizeTypes.LARGE,
    'button--green': color === buttonColorTypes.GREEN,
    'button--grey': color === buttonColorTypes.GREY,
    'button--red': color === buttonColorTypes.RED,
  });

  if (type === buttonTypes.LINK) {
    return (
      <Link to={url} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={classes}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    buttonTypes.BUTTON,
    buttonTypes.SUBMIT,
    buttonTypes.LINK,
  ]).isRequired,
  onClick: PropTypes.func,
  color: PropTypes.oneOf([
    buttonColorTypes.GREY,
    buttonColorTypes.GREEN,
    buttonColorTypes.RED,
  ]),
  size: PropTypes.oneOf([
    buttonSizeTypes.NORMAL,
    buttonSizeTypes.LARGE,
  ]),
  url: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => false,
  color: buttonColorTypes.GREY,
  size: buttonSizeTypes.NORMAL,
  url: '',
};

export default Button;
