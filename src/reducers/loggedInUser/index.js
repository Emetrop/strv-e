import * as Immutable from 'immutable';
import * as actionTypes from '../../constants/actionTypes';

const loggedInUser = (state = Immutable.Map({}), action) => {
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

export default loggedInUser;
