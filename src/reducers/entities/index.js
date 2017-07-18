import merge from 'lodash/fp/merge';
import * as actionTypes from '../../constants/actionTypes';

const entities = (state = { users: {}, events: {} }, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ENTITIES_SUCCESS:
      return action.payload;
    case actionTypes.MERGE_ENTITIES:
      return mergeEntities(state, action.payload);
    case actionTypes.LOAD_ENTITIES_ERROR:
    case actionTypes.LOGOUT:
      return { users: {}, events: {} };
    default:
      return state;
  }
};

function mergeEntities(state, entities) {
  return merge(entities, state, {});
}

export default entities;
