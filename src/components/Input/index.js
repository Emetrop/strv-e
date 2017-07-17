import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, error, name, type, value, ...others }) => (
  <div>
    <label htmlFor={name}>
      {label}
    </label>
    <input name={name} type={type} defaultValue={value} {...others} />
    {error && <div>{error}</div>}
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

export default Input;
