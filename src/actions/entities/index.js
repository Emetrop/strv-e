import * as actionTypes from '../../constants/actionTypes';

export const loadEntities = () => ({
  type: actionTypes.LOAD_ENTITIES,
});

export const loadEntitiesRequest = () => ({
  type: actionTypes.LOAD_ENTITIES_REQUEST,
});

export const loadEntitiesSuccess = data => ({
  type: actionTypes.LOAD_ENTITIES_SUCCESS,
  payload: data,
});

export const loadEntitiesError = errors => ({
  type: actionTypes.LOAD_ENTITIES_ERROR,
  error: true,
  payload: errors,
});

export function mergeEntities(payload) {
  return {
    type: actionTypes.MERGE_ENTITIES,
    payload,
  };
}

export function updateEntity(payload) {
  return {
    type: actionTypes.UPDATE_ENTITY,
    payload,
  };
}

export function deleteEntity(path) {
  return {
    type: actionTypes.DELETE_ENTITY,
    path,
  };
}
