import * as Immutable from 'immutable';
import { createSelector } from 'reselect';
import * as filterTypes from './constants/eventFilter';

export const getEvents = state => state.getIn(['entities', 'events']);

export const getUsers = state => state.getIn(['entities', 'users']);

export const getUserById = (state, id) => state.getIn(['entities', 'users', id]);

export const getEventById = (state, id) => state.getIn(['entities', 'events', id]);

export const getCurrentUser = state => state.getIn(['logIn', 'user']);

export const getCurrentUserID = state => state.getIn(['logIn', 'user', 'id']);

export const getEventFilterType = state => state.getIn(['filter', 'eventFilterType']);

export const getEventFilterTimestamp = state => state.getIn(['filter', 'eventFilterTimestamp']);

export const getFilteredEvents = createSelector(
  [getEvents, getUsers, getEventFilterTimestamp],
  (events, users, timestamp) => {
    const eventsWithAuthors = events.map(e => e.set('owner', users.get(e.get('owner'))));
    let filteredEvents = Immutable.Map();

    filteredEvents = filteredEvents
      .set(
        filterTypes.PAST,
        eventsWithAuthors.filter(e => new Date(e.get('startsAt')).getTime() < timestamp),
      );

    filteredEvents = filteredEvents
      .set(
        filterTypes.FUTURE,
        eventsWithAuthors.filter(e => new Date(e.get('startsAt')).getTime() > timestamp),
      );

    filteredEvents = filteredEvents
      .set(
        filterTypes.ALL,
        eventsWithAuthors,
      );

    return filteredEvents;
  },
);

export const getProfileEvents = createSelector(
  [getEvents, getUsers, getCurrentUserID],
  (events, users, id) => {
    const eventsWithAuthors = events.map(e => e.set('owner', users.get(e.get('owner'))));

    const organizedEvents = eventsWithAuthors.filter(e => e.getIn(['owner', 'id']) === id);
    const participatedEvents = eventsWithAuthors.filter(
      e => (!e.has('attendees') ? false : e.get('attendees').has(id)));

    return organizedEvents.merge(participatedEvents);
  },
);

export const getEventWithAuthorAndAttendees = createSelector(
  [getEventById, getUsers],
  (event, users) => event
      .set('owner', users.get(event.get('owner')))
      .set('attendees', event.get('attendees').map(id => users.get(id))),
);
