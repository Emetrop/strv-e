import * as actionTypes from '../../constants/actionTypes';

export function filterEvents(filterType) {
  return {
    type: actionTypes.SET_EVENT_FILTER,
    filterType,
  };
}
