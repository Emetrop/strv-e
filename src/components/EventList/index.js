import React from 'react';
import PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import Event from '../Event';
import EventListHeader from './header';

const EventList = ({ events }) => (
  <div>
    <div>
      <EventListHeader />
    </div>
    <div>
      {events.valueSeq().map(event => (
        <Event
          title={event.get('title')}
          description={event.get('description')}
          startsAt={event.get('startsAt')}
          capacity={event.get('capacity')}
          attendees={event.get('attendees').size}
          firstName={event.getIn(['owner', 'firstName'])}
          lastName={event.getIn(['owner', 'lastName'])}
          id={event.get('id')}
          key={event.get('id')}
        />))}
    </div>
  </div>
);

EventList.propTypes = {
  events: PropTypes.instanceOf(Immutable.Map),
};

EventList.defaultProps = {
  events: Immutable.Map({}),
};

export default EventList;
