import * as filterTypes from './constants/eventFilter';

export const getEvents = state => state.getIn(['entities', 'events']);

export const getUsers = state => state.getIn(['entities', 'users']);

export const getUserById = (state, id) => state.getIn(['entities', 'users', id]);

export const getEventById = (state, id) => state.getIn(['entities', 'events', id]);

export const getCurrentUser = state => state.getIn(['logIn', 'user']);

export const getCurrentEventFilter = state => state.getIn(['filter', 'eventFilterType']);

export const getFilteredEvents = (state, timestampNow) => {
  const events = getEvents(state);
  const filter = state.getIn(['filter', 'eventFilterType']);

  if (filter === filterTypes.PAST) {
    return events.filter(e => new Date(e.get('startsAt')).getTime() < timestampNow);
  }

  if (filter === filterTypes.FUTURE) {
    return events.filter(e => new Date(e.get('startsAt')).getTime() > timestampNow);
  }

  return events;
};

export const getUserByEventAuthorId = (state, id) => {
  const event = getEventById(state, id);
  return state.getIn(['entities', 'users', event.get('owner')]);
};

const getOrganizedEvents = (state) => {
  const events = state.getIn(['entities', 'events']);
  const id = state.getIn(['logIn', 'user', 'id']);

  return events.filter(e => e.get('owner') === id);
};

const getParticipatedEvents = (state) => {
  const events = state.getIn(['entities', 'events']);
  const id = state.getIn(['logIn', 'user', 'id']);

  return events.filter(
    e => (!e.has('attendees') ? false : e.get('attendees').has(id)),
  );
};

export const getProfileEvents = state =>
  getOrganizedEvents(state).merge(getParticipatedEvents(state));
