import * as Immutable from 'immutable';
import { createSelector } from 'reselect';
import { eventListFilters } from './components/EventList';

export const getEvents = state => state.getIn(['entities', 'events']);

export const getUsers = state => state.getIn(['entities', 'users']);

export const getUserById = (state, id) => state.getIn(['entities', 'users', id]);

export const getEventById = (state, id) => state.getIn(['entities', 'events', id]);

export const getCurrentUser = state => state.get('loggedInUser');

export const getCurrentUserID = state => state.getIn(['loggedInUser', 'id']);

export const getEventFilterType = state => state.getIn(['settings', 'eventFilterType']);

export const getEventFilterTimestamp = state => state.getIn(['settings', 'eventFilterTimestamp']);

export const getEventListView = state => state.getIn(['settings', 'eventListView']);

export const getAuthToken = state => state.getIn(['loggedInUser', 'authToken']);

export const getFormErrors = (state, formName) => state.getIn(['forms', formName, 'errors']);

export const isLoggedIn = state => state.hasIn(['loggedInUser', 'authToken']);

export const getFilteredEvents = createSelector(
  [getEvents, getUsers, getEventFilterTimestamp],
  (events, users, timestamp) => {
    const eventsWithUsers = events
      .map(e => e.set('owner', users.get(e.get('owner'))))
      .map(e => e.set('attendees', e.get('attendees').map(id => users.get(id))))
      .sort((a, b) => a.get('startsAt').localeCompare(b.get('startsAt')))
      .reverse();

    let filteredEvents = Immutable.Map();

    filteredEvents = filteredEvents
      .set(
        eventListFilters.PAST,
        eventsWithUsers.filter(e => new Date(e.get('startsAt')).getTime() < timestamp),
      );

    filteredEvents = filteredEvents
      .set(
        eventListFilters.FUTURE,
        eventsWithUsers.filter(e => new Date(e.get('startsAt')).getTime() > timestamp),
      );

    filteredEvents = filteredEvents
      .set(
        eventListFilters.ALL,
        eventsWithUsers,
      );

    return filteredEvents;
  },
);

export const getProfileEvents = createSelector(
  [getEvents, getUsers, getCurrentUserID],
  (events, users, id) => {
    const eventsWithUsers = events
      .map(e => e.set('owner', users.get(e.get('owner'))))
      .map(e => e.set('attendees', e.get('attendees').map(id => users.get(id))))
      .sort((a, b) => a.get('startsAt').localeCompare(b.get('startsAt')))
      .reverse();

    return eventsWithUsers
      .filter(e => (!e.has('attendees') ? false : e.get('attendees').find(a => a.get('id') === id)));
  },
);

export const getEventWithAuthorAndAttendees = createSelector(
  [getEventById, getUsers],
  (event, users) => {
    if (!event) return Immutable.Map({});

    return event
      .set('owner', users.get(event.get('owner')))
      .set('attendees', event.get('attendees').map(id => users.get(id)));
  },
);
