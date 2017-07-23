import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { Link, Redirect } from 'react-router-dom';
import Event, { getEventButtonType } from '../Event';
import EventDetailAttendees from './attendees';
import PageHeader, { PageHeaderMenu } from '../PageHeader';
import { getEventWithAuthorAndAttendees, getCurrentUserID } from '../../selectors';
import { getFormattedDateTime, leaveEvent, joinEvent } from '../../actions';
import ContentHeader from '../ContentHeader';

const EventDetail = ({ event, currentUserID, leaveEvent, joinEvent }) => {
  if (event.isEmpty()) return <Redirect to="/dashboard" />;

  return (
    <div>
      <PageHeader
        contentMiddle={<Link to="/dashboard">Back to events</Link>}
        contentRight={<PageHeaderMenu />}
      />
      <ContentHeader
        contentLeft={<h3>DETAIL EVENT: #{event.get('id')}</h3>}
      />
      <div>
        <Event
          title={event.get('title')}
          description={event.get('description')}
          startsAt={getFormattedDateTime(event.get('startsAt'))}
          capacity={event.get('capacity')}
          attendees={event.has('attendees') ? event.get('attendees').size : 0}
          firstName={event.getIn(['owner', 'firstName'])}
          lastName={event.getIn(['owner', 'lastName'])}
          buttonType={getEventButtonType(event, currentUserID)}
          leaveEvent={leaveEvent}
          joinEvent={joinEvent}
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
};

EventDetail.propTypes = {
  event: PropTypes.instanceOf(Immutable.Map).isRequired,
  leaveEvent: PropTypes.func.isRequired,
  joinEvent: PropTypes.func.isRequired,
  currentUserID: PropTypes.string.isRequired,
};

const mapStateToProps = (state, params) => {
  const id = params.match.params.id;

  return {
    event: getEventWithAuthorAndAttendees(state, id),
    currentUserID: getCurrentUserID(state),
  };
};

const mapDispatchToProps = dispatch => ({
  leaveEvent(id) {
    dispatch(leaveEvent(id));
  },
  joinEvent(id) {
    dispatch(joinEvent(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
