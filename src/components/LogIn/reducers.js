import { combineReducers } from 'redux';
import { LOGIN_SUBMIT, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './actions';

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_ERROR:
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const isWaiting = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUBMIT:
    case LOGIN_REQUEST:
      return true;
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const isError = (state = false, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return true;
    case LOGIN_SUBMIT:
    case LOGIN_REQUEST:
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const error = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return action.payload;
    case LOGIN_SUBMIT:
    case LOGIN_REQUEST:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    case LOGIN_SUBMIT:
    case LOGIN_REQUEST:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  isLoggedIn,
  isWaiting,
  isError,
  error,
  user,
});
