import React from 'react';
import PropTypes from 'prop-types';

const EventDetailAttendees = ({ users, currentUserID }) => (
  <div>
    {users.some(user => user.id === currentUserID) && <span>You</span>}
    {users
        .filter(user => user.id !== currentUserID)
        .map(user =>
          <span key={user.id}>{user.firstName} {user.lastName}</span>,
        )}
  </div>
);

EventDetailAttendees.propTypes = {
  currentUserID: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })),
};

EventDetailAttendees.defaultProps = {
  users: [],
};

export default EventDetailAttendees;
