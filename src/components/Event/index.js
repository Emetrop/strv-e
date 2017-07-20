import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Event = ({ title, description, startsAt, capacity, attendees, firstName, lastName, id }) => (
  <div>
    <h2>
      <Link to={`/event/${id}`}>
        {title}
      </Link>
    </h2>
    <div>
      {startsAt}
    </div>
    <div>
      {firstName} {lastName}
    </div>
    <div>
      {description}
    </div>
    <div>
      {attendees}{' of '}{capacity}
    </div>
  </div>
);

Event.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startsAt: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  attendees: PropTypes.number.isRequired,
};

export default Event;
