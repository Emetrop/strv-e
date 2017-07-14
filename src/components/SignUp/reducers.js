import { combineReducers } from 'redux';
import { SIGNUP_SUBMIT, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR } from './actions';

const isWaiting = (state = false, action) => {
  switch (action.type) {
    case SIGNUP_SUBMIT:
    case SIGNUP_REQUEST:
      return true;
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
      return false;
    default:
      return state;
  }
};

const isError = (state = false, action) => {
  switch (action.type) {
    case SIGNUP_ERROR:
      return true;
    case SIGNUP_SUBMIT:
    case SIGNUP_REQUEST:
      return false;
    default:
      return state;
  }
};

const error = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_ERROR:
      return action.payload;
    case SIGNUP_SUBMIT:
    case SIGNUP_REQUEST:
      return {};
    default:
      return state;
  }
};


export default combineReducers({
  isWaiting,
  isError,
  error,
});
