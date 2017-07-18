import React from 'react';
import PropTypes from 'prop-types';
import Event from '../Event';

const EventList = ({ events, users }) => (
  <div>
    {events.map(event =>
      <Event {...event} {...users[event.owner]} id={event.id} key={event.id} />)}
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
      owner: PropTypes.string.isRequired,
      attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  ),
// eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  users: PropTypes.object,
};

EventList.defaultProps = {
  events: [],
};

export default EventList;
