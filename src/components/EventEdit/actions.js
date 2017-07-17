// Actions
export const UPDATE_EVENT_SUBMIT = 'eventio/edit/UPDATE_EVENT';
export const UPDATE_EVENT_REQUEST = 'eventio/edit/UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'eventio/edit/UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_ERROR = 'eventio/edit/UPDATE_EVENT_ERROR';

// Action Creators
export const updateEventSubmit = payload => ({
  type: UPDATE_EVENT_SUBMIT,
  payload,
});

export const updateEventRequest = payload => ({
  type: UPDATE_EVENT_REQUEST,
  payload,
});

export const updateEventSuccess = data => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: data,
});

export const updateEventError = errors => ({
  type: UPDATE_EVENT_ERROR,
  error: true,
  payload: errors,
});
