import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import Event from '../Event';
import EventDetailAttendees from './attendees';
import { getEventById, getUserByEventAuthorID, getEventAttendees, getCurrentUserID } from '../../selectors';

const EventDetail = ({ event, user, attendees, currentUserID }) => (
  <div>
    <div>
      <Event
        title={event.get('title')}
        description={event.get('description')}
        startsAt={event.get('startsAt')}
        capacity={event.get('capacity')}
        attendees={event.get('attendees').size}
        firstName={user.get('firstName')}
        lastName={user.get('lastName')}
        id={event.get('id')}
      />
    </div>
    <div>
      <EventDetailAttendees users={attendees.toJS()} currentUserID={currentUserID} />
    </div>
  </div>
);

EventDetail.propTypes = {
  event: PropTypes.instanceOf(Immutable.Map).isRequired,
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
  attendees: PropTypes.instanceOf(Immutable.List),
  currentUserID: PropTypes.string.isRequired,
};

EventDetail.defaultProps = {
  attendees: Immutable.List([]),
};

const mapStateToProps = (state, params) => {
  const id = params.match.params.id;

  return {
    event: getEventById(state, id),
    user: getUserByEventAuthorID(state, id),
    attendees: getEventAttendees(state, id),
    currentUserID: getCurrentUserID(state),
  };
};

export default connect(mapStateToProps)(EventDetail);
