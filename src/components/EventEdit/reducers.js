import { combineReducers } from 'redux';
import { UPDATE_EVENT_SUBMIT, UPDATE_EVENT_REQUEST, UPDATE_EVENT_ERROR } from './actions';
import { LOGOUT } from '../LogIn/actions';

const error = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT_ERROR:
      return action.payload;
    case UPDATE_EVENT_SUBMIT:
    case UPDATE_EVENT_REQUEST:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  error,
});
