import React from 'react';
import PropTypes from 'prop-types';
import Event from '../Event';

const EventList = ({ events }) => (
  <div>
    {events && events.map(event => <Event {...event} key={event.id} />)}
  </div>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startsAt: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      attendees: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        })).isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

EventList.defaultProps = {
  events: [],
};

export default EventList;
