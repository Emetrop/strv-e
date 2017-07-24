import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export const NewEventButton = () => <Link to="/event/new" className="newEventButton" />;

export default NewEventButton;
