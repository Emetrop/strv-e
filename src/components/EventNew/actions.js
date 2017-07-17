// Actions
export const CREATE_EVENT_SUBMIT = 'eventio/create/CREATE_EVENT_SUBMIT';
export const CREATE_EVENT_REQUEST = 'eventio/create/CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'eventio/create/CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'eventio/create/CREATE_EVENT_ERROR';

// Action Creators
export const createEventSubmit = payload => ({
  type: CREATE_EVENT_SUBMIT,
  payload,
});

export const createEventRequest = payload => ({
  type: CREATE_EVENT_REQUEST,
  payload,
});

export const createEventSuccess = data => ({
  type: CREATE_EVENT_SUCCESS,
  payload: data,
});

export const createEventError = errors => ({
  type: CREATE_EVENT_ERROR,
  error: true,
  payload: errors,
});
