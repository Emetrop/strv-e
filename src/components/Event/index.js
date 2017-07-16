import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Event = ({ title, description, startsAt, capacity, attendees, owner, id }) => (
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
      {owner.firstname} {owner.lastname}
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
  owner: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
};

export default Event;
