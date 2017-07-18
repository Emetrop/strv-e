export const getEvents = state => state.entities.events;

export const getUsers = state => state.entities.users;

export const getUserById = (state, id) => state.entities.users[id];

export const getEventById = (state, id) => state.entities.events[id];

export const getUserByEventAuthorId = (state, id) => {
  const event = getEventById(state, id);
  return state.entities.users[event.owner];
};

const getOrganizedEvents = (state) => {
  const events = state.entities.events;
  const id = state.logIn.user.id;

  return Object.values(events).filter(e => e.owner === id);
};

const getParticipatedEvents = (state) => {
  const events = state.entities.events;
  const id = state.logIn.user.id;

  return Object.values(events).filter(
    e => (!e.attendees ? false : e.attendees.includes(id)),
  );
};

export const getProfileEvents = state =>
  [...getOrganizedEvents(state), ...getParticipatedEvents(state)];
