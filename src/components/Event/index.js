import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Default } from '../Responsive';
import Button, { buttonTypes, buttonColorTypes } from '../Button';
import './styles.css';

export const eventButtonTypes = {
  EDIT: 'edit',
  JOIN: 'join',
  LEAVE: 'leave',
  EXPIRED: 'expired',
};

export const eventStyleTypes = {
  BLOCK: 'block',
  LIST: 'list',
  FULLWIDTH: 'fullwidth',
};

const Event = ({
  title,
  description,
  startsAt,
  capacity,
  attendees,
  firstName,
  lastName,
  id,
  buttonType,
  leaveEvent,
  joinEvent,
  eventStyle,
}) => {
  const getButton = () => {
    switch (buttonType) {
      case eventButtonTypes.EDIT:
        return (<Button
          type={buttonTypes.LINK}
          color={buttonColorTypes.GREY}
          url={`/event/${id}/edit`}
        >Edit</Button>);
      case eventButtonTypes.LEAVE:
        return (<Button
          type={buttonTypes.BUTTON}
          color={buttonColorTypes.RED}
          onClick={() => leaveEvent(id)}
        >Leave</Button>);
      case eventButtonTypes.JOIN:
        return (<Button
          type={buttonTypes.BUTTON}
          color={buttonColorTypes.GREEN}
          onClick={() => joinEvent(id)}
        >Join</Button>);
      case eventButtonTypes.EXPIRED:
        return <span />;
      default:
        throw new Error(`Unknown buttonType: ${buttonType}`);
    }
  };

  return eventStyle === eventStyleTypes.LIST
    ?
      <div className="eventList">
        <div className="eventList__content">
          <h2 className="eventList__title">
            <Link to={`/event/${id}`} className="eventList__titleLink">
              {title}
            </Link>
          </h2>
          <div className="eventList__description">
            {description}
          </div>
          <Default>
            <div className="eventList__name">
              {firstName} {lastName}
            </div>
          </Default>
          <div className="eventList__date">
            {startsAt}
          </div>
          <div className="eventList__attendees">
            {attendees}{' of '}{capacity}
          </div>
          <div className="eventList__button">
            {getButton()}
          </div>
        </div>
      </div>
    :
      <div className={eventStyle === eventStyleTypes.BLOCK ? 'event event--block' : 'event'}>
        <div className="event__content">
          <div className="event__date">
            {startsAt}
          </div>
          <h2 className="event__title">
            <Link to={`/event/${id}`} className="event__title">
              {title}
            </Link>
          </h2>
          <div className="event__name">
            {firstName} {lastName}
          </div>
          <div className="event__description">
            {description}
          </div>
          <div className="event__bottom">
            <span className="event__attendees">
              <span className="event__user" />
              <span className="event__count">{attendees}{' of '}{capacity}</span>
            </span>
            <span>
              {getButton()}
            </span>
          </div>
        </div>
      </div>;
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
  eventStyle: PropTypes.oneOf([
    eventStyleTypes.BLOCK,
    eventStyleTypes.LIST,
    eventStyleTypes.FULLWIDTH,
  ]).isRequired,
};

Event.defaultProps = {
  eventStyle: eventStyleTypes.BLOCK,
};

export const getEventButtonType = (event, currentUserID) => {
  if (new Date(event.get('startsAt')).getTime() < Date.now()) return eventButtonTypes.EXPIRED;

  if (event.getIn(['owner', 'id']) === currentUserID) return eventButtonTypes.EDIT;

  if (event.has('attendees') &&
      event.get('attendees').find(a => a.get('id') === currentUserID)) return eventButtonTypes.LEAVE;

  return eventButtonTypes.JOIN;
};

export default Event;
