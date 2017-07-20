import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import Event, { getEventButtonType } from '../Event';
import EventListHeader from './header';
import { getFormattedDateTime, leaveEvent, joinEvent } from '../../actions';
import { getCurrentUserID } from '../../selectors';

const EventList = ({ events, leaveEvent, joinEvent, currentUserID }) => {
  const getDescription = (event) => {
    let descrition = event.get('description').substring(0, 60);
    descrition += event.get('description').length > 60 ? '...' : '';

    return descrition;
  };

  return (
    <div>
      <div>
        <EventListHeader />
      </div>
      <div>
        {events.valueSeq().map(event => (
          <Event
            title={event.get('title')}
            description={getDescription(event)}
            startsAt={getFormattedDateTime(event.get('startsAt'))}
            capacity={event.get('capacity')}
            attendees={event.get('attendees').size}
            firstName={event.getIn(['owner', 'firstName'])}
            lastName={event.getIn(['owner', 'lastName'])}
            id={event.get('id')}
            buttonType={getEventButtonType(event, currentUserID)}
            leaveEvent={leaveEvent}
            joinEvent={joinEvent}
            key={event.get('id')}
          />))}
      </div>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.instanceOf(Immutable.Map),
  leaveEvent: PropTypes.func.isRequired,
  joinEvent: PropTypes.func.isRequired,
  currentUserID: PropTypes.string.isRequired,
};

EventList.defaultProps = {
  events: Immutable.Map({}),
};

const mapStateToProps = state => ({
  currentUserID: getCurrentUserID(state),
});

const mapDispatchToProps = dispatch => ({
  leaveEvent(id) {
    dispatch(leaveEvent(id));
  },
  joinEvent(id) {
    dispatch(joinEvent(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
