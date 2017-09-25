import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, Redirect } from 'react-router-dom';
import Event, { getEventButtonType, eventStyleTypes } from '../../components/Event/index';
import EventAttendees from '../../components/EventAttendees/index';
import PageHeader, { PageHeaderMenu, PageHeaderLogo } from '../../components/PageHeader/index';
import { getEventWithAuthorAndAttendees, getCurrentUserID } from '../../selectors';
import { getFormattedDateTime, leaveEvent, joinEvent } from '../../actions/index';
import ContentHeader from '../../components/ContentHeader/index';
import { Default, Mobile } from '../../components/Responsive/index';
import { NewEventButton } from '../../components/NewEventButton/index';
import BackIcon from '../../images/back';
import './styles.css';

const EventDetail = ({
  event,
  currentUserID,
  leaveEvent,
  joinEvent,
}) => {
  if (event.isEmpty()) return <Redirect to="/dashboard" />;

  return (
    <div>
      <PageHeader
        contentLeft={<PageHeaderLogo link="/dashboard" />}
        contentMiddle={
          <Default>
            <Link to="/dashboard" className="eventDetail__backLink">
              <BackIcon className="eventDetail__backIcon" />
              <span className="eventDetail__backText">Back to events</span>
            </Link>
          </Default>}
        contentRight={<PageHeaderMenu />}
      />
      <ContentHeader
        contentLeft={
          <div>
            <Mobile>
              <h3 className="eventDetail__title">DETAIL EVENT:<br />#{event.get('id')}</h3>
            </Mobile>
            <Default>
              <h3 className="eventDetail__title">DETAIL EVENT: #{event.get('id')}</h3>
            </Default>
          </div>
        }
      />
      <div className="containerResponsive">
        <div className="eventDetail__event">
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
            eventStyle={eventStyleTypes.FULLWIDTH}
          />
        </div>
        <div className="eventDetail__attendees">
          <EventAttendees
            currentUserID={currentUserID}
            users={event.has('attendees') ? event.get('attendees').toJS() : []}
          />
        </div>
      </div>
      <NewEventButton />
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
