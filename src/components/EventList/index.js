import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Event, { getEventButtonType, eventStyleTypes } from '../Event';
import { getFormattedDateTime, leaveEvent, joinEvent } from '../../actions';
import { getCurrentUserID, getEventListView } from '../../selectors';
import EventListFilter, { eventListFilters } from './filter';
import EventListViewToggle, { eventListViews } from './viewToggle';
import './styles.css';

const EventList = ({
  events,
  leaveEvent,
  joinEvent,
  currentUserID,
  currentListView,
}) => {
  const getDescription = (event) => {
    const maxLength = currentListView === eventListViews.GRID ? 60 : 30;

    let descrition = event.get('description').substring(0, maxLength);
    descrition += event.get('description').length > maxLength ? '...' : '';

    return descrition;
  };

  return (
    <div className="containerResponsive">
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
          eventStyle={
            currentListView === eventListViews.GRID ?
              eventStyleTypes.BLOCK :
              eventStyleTypes.LIST
          }
          key={event.get('id')}
        />))}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.instanceOf(Immutable.Map),
  leaveEvent: PropTypes.func.isRequired,
  joinEvent: PropTypes.func.isRequired,
  currentUserID: PropTypes.string.isRequired,
  currentListView: PropTypes.oneOf([
    eventListViews.GRID,
    eventListViews.LIST,
  ]).isRequired,
};

EventList.defaultProps = {
  events: Immutable.Map({}),
};

const mapStateToProps = state => ({
  currentUserID: getCurrentUserID(state),
  currentListView: getEventListView(state),
});

const mapDispatchToProps = dispatch => ({
  leaveEvent(id) {
    dispatch(leaveEvent(id));
  },
  joinEvent(id) {
    dispatch(joinEvent(id));
  },
});

export {
  EventListFilter,
  EventListViewToggle,
  eventListViews,
  eventListFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
