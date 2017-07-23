import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonLink from '../ButtonLink';
import Button, { buttonTypes } from '../Button';

export const eventButtonTypes = {
  EDIT: 'edit',
  JOIN: 'join',
  LEAVE: 'leave',
  EXPIRED: 'expired',
};

const Event = ({ title, description, startsAt, capacity,
                 attendees, firstName, lastName, id,
                 buttonType, leaveEvent, joinEvent }) => {
  const getButton = () => {
    switch (buttonType) {
      case eventButtonTypes.EDIT:
        return <ButtonLink url={`/event/${id}/edit`}>Edit</ButtonLink>;
      case eventButtonTypes.LEAVE:
        return <Button type={buttonTypes.BUTTON} onClick={() => leaveEvent(id)}>Leave</Button>;
      case eventButtonTypes.JOIN:
        return <Button type={buttonTypes.BUTTON} onClick={() => joinEvent(id)}>Join</Button>;
      case eventButtonTypes.EXPIRED:
        return <span />;
      default:
        throw new Error(`Unknown buttonType: ${buttonType}`);
    }
  };

  return (
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
      <div>
        {getButton()}
      </div>
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startsAt: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  attendees: PropTypes.number.isRequired,
  buttonType: PropTypes.oneOf([
    eventButtonTypes.EDIT,
    eventButtonTypes.LEAVE,
    eventButtonTypes.JOIN,
    eventButtonTypes.EXPIRED,
  ]).isRequired,
  leaveEvent: PropTypes.func.isRequired,
  joinEvent: PropTypes.func.isRequired,
};

export const getEventButtonType = (event, currentUserID) => {
  if (new Date(event.get('startsAt')).getTime() < Date.now()) return eventButtonTypes.EXPIRED;

  if (event.getIn(['owner', 'id']) === currentUserID) return eventButtonTypes.EDIT;

  if (event.has('attendees') &&
      event.get('attendees').find(a => a.get('id') === currentUserID)) return eventButtonTypes.LEAVE;

  return eventButtonTypes.JOIN;
};

export default Event;
