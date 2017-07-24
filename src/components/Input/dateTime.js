import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

export const inputDateTimeTypes = {
  DATE: 'date',
  TIME: 'time',
  DATETIME: 'datetime',
};

const InputDateTime = ({ label, error, name, type, value }) => {
  const options = {
    defaultDate: value,
    enableTime: type === inputDateTimeTypes.TIME || type === inputDateTimeTypes.DATETIME,
    noCalendar: type === inputDateTimeTypes.TIME,
    altInput: true,
    // minDate: 'today', doesn't work right now
  };

  return (
    <div className="input__group">
      <span><Flatpickr name={name} className={error ? 'input input--error' : 'input'} options={options} /></span>
      <span className="input__highlight" />
      <span className="input__bar" />
      <label className="input__label input__label--dateTime" htmlFor={name}>{label}</label>
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};

InputDateTime.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    inputDateTimeTypes.DATE,
    inputDateTimeTypes.TIME,
    inputDateTimeTypes.DATETIME,
  ]).isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
};

InputDateTime.defaultProps = {
  error: '',
  value: '',
};

export default InputDateTime;
