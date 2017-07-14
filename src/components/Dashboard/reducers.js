import { combineReducers } from 'redux';
import { LOAD_EVENTS, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_ERROR } from './actions';
import { LOGOUT } from '../LogIn/actions';

const isEventsWaiting = (state = false, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
    case LOAD_EVENTS_REQUEST:
      return true;
    case LOAD_EVENTS_SUCCESS:
    case LOAD_EVENTS_ERROR:
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const isEventsError = (state = false, action) => {
  switch (action.type) {
    case LOAD_EVENTS_ERROR:
      return true;
    case LOAD_EVENTS:
    case LOAD_EVENTS_REQUEST:
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const eventsError = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EVENTS_ERROR:
      return action.payload;
    case LOAD_EVENTS:
    case LOAD_EVENTS_REQUEST:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  isEventsWaiting,
  isEventsError,
  eventsError,
});
