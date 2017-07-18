import * as actionTypes from '../../constants/actionTypes';

// Action Creators
export const createEventSubmit = payload => ({
  type: actionTypes.CREATE_EVENT_SUBMIT,
  payload,
});

export const createEventRequest = payload => ({
  type: actionTypes.CREATE_EVENT_REQUEST,
  payload,
});

export const createEventSuccess = data => ({
  type: actionTypes.CREATE_EVENT_SUCCESS,
  payload: data,
});

export const createEventError = errors => ({
  type: actionTypes.CREATE_EVENT_ERROR,
  error: true,
  payload: errors,
});
