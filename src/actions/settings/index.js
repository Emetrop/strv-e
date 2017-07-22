import * as actionTypes from '../../constants/actionTypes';

export function filterEvents(filterType) {
  return {
    type: actionTypes.SET_EVENT_FILTER,
    filterType,
  };
}

export function setEventFilterTimestamp(timestamp) {
  return {
    type: actionTypes.SET_EVENT_FILTER_TIMESTAMP,
    timestamp,
  };
}

export function setEventListView(viewType) {
  return {
    type: actionTypes.SET_EVENT_LIST_VIEW,
    viewType,
  };
}

export const getCurrentTimestamp = () => Math.floor(Date.now() / (100 * 1000)) * (100 * 1000);
