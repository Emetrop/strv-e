import * as actionTypes from '../../constants/actionTypes';

export const updateEventSubmit = payload => ({
  type: actionTypes.UPDATE_EVENT_SUBMIT,
  payload,
});

export const updateEventRequest = payload => ({
  type: actionTypes.UPDATE_EVENT_REQUEST,
  payload,
});

export const updateEventSuccess = data => ({
  type: actionTypes.UPDATE_EVENT_SUCCESS,
  payload: data,
});

export const updateEventError = errors => ({
  type: actionTypes.UPDATE_EVENT_ERROR,
  error: true,
  payload: errors,
});
