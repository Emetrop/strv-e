import { combineReducers } from 'redux';
import * as actionTypes from '../../constants/actionTypes';

const error = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EVENT_ERROR:
      return action.payload;
    case actionTypes.UPDATE_EVENT_SUBMIT:
    case actionTypes.UPDATE_EVENT_REQUEST:
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  error,
});
