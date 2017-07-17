import { combineReducers } from 'redux';
import dashboard from './components/Dashboard/reducers';
import logIn from './components/LogIn/reducers';
import signUp from './components/SignUp/reducers';
import eventNew from './components/EventNew/reducers';
import eventEdit from './components/EventEdit/reducers';
import { LOAD_EVENTS_SUCCESS, LOAD_EVENTS_ERROR } from './components/Dashboard/actions';
import { LOGOUT } from './components/LogIn/actions';

const events = (state = [], action) => {
  switch (action.type) {
    case LOAD_EVENTS_SUCCESS:
      return action.payload;
    case LOAD_EVENTS_ERROR:
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

export const getEventById = (state, id) => state.events.find(event => event.id === id);

const getOrganizedEvents = (state) => {
  const events = state.events;
  const id = state.logIn.user.id;

  return events.filter(e => e.owner.id === id);
};

const getParticipatedEvents = (state) => {
  const events = state.events;
  const id = state.logIn.user.id;

  return events.filter(
    e => (!e.attendees ? false : e.attendees.some(a => a.id === id)),
  );
};

export const getProfileEvents = state =>
  [...getOrganizedEvents(state), ...getParticipatedEvents(state)];

export default combineReducers({
  events,
  dashboard,
  logIn,
  signUp,
  eventNew,
  eventEdit,
});
