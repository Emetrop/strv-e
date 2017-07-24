import React from 'react';
import PropTypes from 'prop-types';
import InputDateTime, { inputDateTimeTypes } from './dateTime';
import './styles.css';

const Input = ({ label, error, name, type, value, ...others }) => (
  <div className="input__group">
    <input name={name} className={error ? 'input input--error' : 'input'} type={type} defaultValue={value} {...others} required />
    <span className="input__highlight" />
    <span className="input__bar" />
    <label className="input__label" htmlFor={name}>{label}</label>
    {error && <span className="input__error">{error}</span>}
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  error: '',
  value: '',
};

export {
  InputDateTime,
  inputDateTimeTypes,
};

export default Input;
