import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

const InputDateTime = ({ label, error, name, type, value }) => {
  const options = {
    defaultDate: value,
    enableTime: type === 'time' || type === 'datetime',
    noCalendar: type === 'time',
    altInput: true,
    minDate: 'today',
  };

  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      <span><Flatpickr name={name} options={options} /></span>
      {error && <div>{error}</div>}
    </div>
  );
};

InputDateTime.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['date', 'time', 'datetime']),
  error: PropTypes.string,
  value: PropTypes.string,
};

InputDateTime.defaultProps = {
  error: '',
  value: '',
  type: 'date',
};

export default InputDateTime;
