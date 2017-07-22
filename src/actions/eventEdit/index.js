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

export const deleteEvent = id => ({
  type: actionTypes.DELETE_EVENT,
  id,
});

export const deleteEventRequest = id => ({
  type: actionTypes.DELETE_EVENT_REQUEST,
  id,
});

export const deleteEventSuccess = data => ({
  type: actionTypes.DELETE_EVENT_SUCCESS,
  payload: data,
});

export const deleteEventError = errors => ({
  type: actionTypes.DELETE_EVENT_ERROR,
  error: true,
  payload: errors,
});
