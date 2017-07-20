import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonLink from '../ButtonLink';
import Button from '../Button';

const Event = ({ title, description, startsAt, capacity,
                 attendees, firstName, lastName, id,
                 buttonType, leaveEvent, joinEvent }) => {
  const getButton = () => {
    switch (buttonType) {
      case 'edit':
        return <ButtonLink url={`/event/${id}/edit`}>Edit</ButtonLink>;
      case 'leave':
        return <Button type="button" onClick={() => leaveEvent(id)}>Leave</Button>;
      case 'join':
        return <Button type="button" onClick={() => joinEvent(id)}>Join</Button>;
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
  buttonType: PropTypes.oneOf(['edit', 'leave', 'join']).isRequired,
  leaveEvent: PropTypes.func.isRequired,
  joinEvent: PropTypes.func.isRequired,
};

export const getEventButtonType = (event, currentUserID) => {
  if (event.getIn(['owner', 'id']) === currentUserID) return 'edit';

  if (event.has('attendees') &&
      event.get('attendees').find(a => a.get('id') === currentUserID)) return 'leave';

  return 'join';
};

export default Event;
