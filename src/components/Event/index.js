import React, { PropTypes } from 'react';

const Event = (title, description, startsAt, capacity, firstName, lastName, attendees) => (
  <div>
    <div>
      {startsAt}
    </div>
    <h2>
      {title}
    </h2>
    <div>
      {firstName} {lastName}
    </div>
    <div>
      {description.substring(0, 60)}
      {description.length > 60 && '...'}
    </div>
    <div>
      {attendees.length}{' of '}{capacity}
    </div>
  </div>
);

Event.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startsAt: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })).isRequired,
};

export default Event;
