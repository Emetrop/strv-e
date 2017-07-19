export const getEvents = state => state.getIn(['entities', 'events']);

export const getUsers = state => state.getIn(['entities', 'users']);

export const getUserById = (state, id) => state.getIn(['entities', 'users', id]);

export const getEventById = (state, id) => state.getIn(['entities', 'events', id]);

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
