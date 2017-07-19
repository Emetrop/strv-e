import { combineReducers } from 'redux-immutable';
import * as Immutable from 'immutable';
import * as actionTypes from '../../constants/actionTypes';

const error = (state = Immutable.Map({}), action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EVENT_ERROR:
      return action.payload;
    case actionTypes.UPDATE_EVENT_SUBMIT:
    case actionTypes.UPDATE_EVENT_REQUEST:
    case actionTypes.LOGOUT:
      return Immutable.Map({});
    default:
      return state;
  }
};

export default combineReducers({
  error,
});
