import React from 'react';
import ConfirmIcon from '../../images/confirm';
import './styles.css';

const EventEditConfirmButton = () => (
  <button type="submit" className="eventEditConfirmButton">
    <ConfirmIcon className="eventEditConfirmButton__icon" />
  </button>
);

export default EventEditConfirmButton;
