import { combineReducers } from 'redux-immutable';
import * as Immutable from 'immutable';
import * as actionTypes from '../../constants/actionTypes';

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return true;
    case actionTypes.LOGIN_ERROR:
    case actionTypes.LOGOUT:
      return false;
    default:
      return state;
  }
};

const isWaiting = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUBMIT:
    case actionTypes.LOGIN_REQUEST:
      return true;
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_ERROR:
    case actionTypes.LOGOUT:
      return false;
    default:
      return state;
  }
};

const isError = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_ERROR:
      return true;
    case actionTypes.LOGIN_SUBMIT:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT:
      return false;
    default:
      return state;
  }
};

const error = (state = Immutable.Map({}), action) => {
  switch (action.type) {
    case actionTypes.LOGIN_ERROR:
      return action.payload;
    case actionTypes.LOGIN_SUBMIT:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT:
      return Immutable.Map({});
    default:
      return state;
  }
};

const user = (state = Immutable.Map({}), action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.payload;
    case actionTypes.LOGIN_SUBMIT:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT:
      return Immutable.Map({});
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
