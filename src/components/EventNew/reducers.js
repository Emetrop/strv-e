import { combineReducers } from 'redux';
import { CREATE_EVENT_SUBMIT, CREATE_EVENT_REQUEST, CREATE_EVENT_ERROR } from './actions';
import { LOGOUT } from '../LogIn/actions';

const error = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_ERROR:
      return action.payload;
    case CREATE_EVENT_SUBMIT:
    case CREATE_EVENT_REQUEST:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  error,
});
