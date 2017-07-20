import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import Event from '../Event';
import EventDetailAttendees from './attendees';
import { getEventWithAuthorAndAttendees, getCurrentUserID } from '../../selectors';

const EventDetail = ({ event, currentUserID }) => (
  <div>
    <div>
      <Event
        title={event.get('title')}
        description={event.get('description')}
        startsAt={event.get('startsAt')}
        capacity={event.get('capacity')}
        attendees={event.has('attendees') ? event.get('attendees').size : 0}
        firstName={event.getIn(['owner', 'firstName'])}
        lastName={event.getIn(['owner', 'lastName'])}
        id={event.get('id')}
      />
    </div>
    <div>
      <EventDetailAttendees
        currentUserID={currentUserID}
        users={event.has('attendees') ? event.get('attendees').toJS() : []}
      />
    </div>
  </div>
);

EventDetail.propTypes = {
  event: PropTypes.instanceOf(Immutable.Map).isRequired,
  currentUserID: PropTypes.string.isRequired,
};

const mapStateToProps = (state, params) => {
  const id = params.match.params.id;

  return {
    event: getEventWithAuthorAndAttendees(state, id),
    currentUserID: getCurrentUserID(state),
  };
};

export default connect(mapStateToProps)(EventDetail);
