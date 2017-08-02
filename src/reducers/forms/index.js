import Immutable from 'immutable';
import * as actionTypes from '../../constants/actionTypes';

const initialState = Immutable.fromJS({
  logIn: {
    errors: {},
  },
  signUp: {
    errors: {},
  },
  eventNew: {
    errors: {},
  },
  eventEdit: {
    errors: {},
  },
});

const forms = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FORM_ERRORS:
      return state.setIn([action.payload.formName, 'errors'], action.payload.errors);
    case actionTypes.CLEAN_FORMS_ERRORS:
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.CREATE_EVENT_SUCCESS:
    case actionTypes.UPDATE_EVENT_SUCCESS:
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default forms;
