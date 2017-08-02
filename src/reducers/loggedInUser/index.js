import Immutable from 'immutable';
import * as actionTypes from '../../constants/actionTypes';

const initialState = Immutable.Map({});

const loggedInUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.payload;
    case actionTypes.LOGIN_SUBMIT:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loggedInUser;
