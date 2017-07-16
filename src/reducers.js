import { combineReducers } from 'redux';
import dashboard from './components/Dashboard/reducers';
import logIn from './components/LogIn/reducers';
import signUp from './components/SignUp/reducers';
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

export default combineReducers({
  events,
  dashboard,
  logIn,
  signUp,
});
