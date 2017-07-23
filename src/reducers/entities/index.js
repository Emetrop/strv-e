import * as Immutable from 'immutable';
import * as actionTypes from '../../constants/actionTypes';

const initialState = Immutable.fromJS({
  users: {},
  events: {},
});

const entities = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ENTITIES_SUCCESS:
      return action.payload;
    case actionTypes.MERGE_ENTITIES:
      return state.merge(action.payload);
    case actionTypes.UPDATE_ENTITY:
      return state.setIn(action.payload.path, action.payload.value);
    case actionTypes.DELETE_ENTITY:
      return state.deleteIn(action.path);
    case actionTypes.LOAD_ENTITIES_ERROR:
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default entities;
