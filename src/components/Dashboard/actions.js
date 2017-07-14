// Actions
export const LOAD_EVENTS = 'eventio/dashboard/LOAD_EVENTS';
export const LOAD_EVENTS_REQUEST = 'eventio/dashboard/LOAD_EVENTS_REQUEST';
export const LOAD_EVENTS_SUCCESS = 'eventio/dashboard/LOAD_EVENTS_SUCCESS';
export const LOAD_EVENTS_ERROR = 'eventio/dashboard/LOAD_EVENTS_ERROR';

// Action Creators
export const loadEvents = () => ({
  type: LOAD_EVENTS,
});

export const loadEventsRequest = () => ({
  type: LOAD_EVENTS_REQUEST,
});

export const loadEventsSuccess = data => ({
  type: LOAD_EVENTS_SUCCESS,
  payload: data,
});

export const loadEventsError = errors => ({
  type: LOAD_EVENTS_ERROR,
  error: true,
  payload: errors,
});
