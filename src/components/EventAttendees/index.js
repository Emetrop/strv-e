import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const EventAttendees = ({
  users,
  currentUserID,
}) => (
  <div className="attendees__container">
    <h3 className="attendees__title">Attendees</h3>
    {Object.keys(users).length === 0 && <span className="attendees__zero">No attendees</span>}
    {users.some(user => user.id === currentUserID) && <span className="attendees__you">You</span>}
    {users
          .filter(user => user.id !== currentUserID)
          .map(user =>
            <span className="attendees__name" key={user.id}>{user.firstName} {user.lastName}</span>,
          )}
  </div>
  );

EventAttendees.propTypes = {
  currentUserID: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })),
};

EventAttendees.defaultProps = {
  users: [],
};

export default EventAttendees;
