import React from 'react';
import PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import Event from '../Event';
import EventListHeader from './header';
import { getFormattedDateTime } from '../../actions/utils';

const EventList = ({ events }) => (
  <div>
    <div>
      <EventListHeader />
    </div>
    <div>
      {events.valueSeq().map((event) => {
        let descrition = event.get('description').substring(0, 60);
        descrition += event.get('description').length > 60 ? '...' : '';

        return (
          <Event
            title={event.get('title')}
            description={descrition}
            startsAt={getFormattedDateTime(event.get('startsAt'))}
            capacity={event.get('capacity')}
            attendees={event.get('attendees').size}
            firstName={event.getIn(['owner', 'firstName'])}
            lastName={event.getIn(['owner', 'lastName'])}
            id={event.get('id')}
            key={event.get('id')}
          />);
      })}
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
