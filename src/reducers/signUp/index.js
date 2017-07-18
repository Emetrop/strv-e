import { combineReducers } from 'redux';
import * as actionTypes from '../../constants/actionTypes';

const isWaiting = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUBMIT:
    case actionTypes.SIGNUP_REQUEST:
      return true;
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNUP_ERROR:
      return false;
    default:
      return state;
  }
};

const isError = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_ERROR:
      return true;
    case actionTypes.SIGNUP_SUBMIT:
    case actionTypes.SIGNUP_REQUEST:
      return false;
    default:
      return state;
  }
};

const error = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_ERROR:
      return action.payload;
    case actionTypes.SIGNUP_SUBMIT:
    case actionTypes.SIGNUP_REQUEST:
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