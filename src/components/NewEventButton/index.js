import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '../../images/add';
import './styles.css';

export const NewEventButton = () => (
  <Link to="/event/new" className="newEventButton">
    <AddIcon className="newEventButton__icon" />
  </Link>
);

export default NewEventButton;
