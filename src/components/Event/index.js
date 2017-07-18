import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Event = ({ title, description, startsAt, capacity, attendees, firstName, lastName, id }) => (
  <div>
    <h2>
      <Link to={`/event/${id}`}>
        {title}
      </Link><br />
      <Link to={`/event/${id}/edit`}>
        edit
      </Link><br />
      <Link to={'/event/new'}>
        new
      </Link><br />
      <Link to={'/profile'}>
        profile
      </Link>
    </h2>
    <div>
      {startsAt}
    </div>
    <div>
      {firstName} {lastName}
    </div>
    <div>
      {description.substring(0, 60)}
      {description.length > 60 ? '...' : ''}
    </div>
    <div>
      {attendees.length}{' of '}{capacity}
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
  attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Event;
