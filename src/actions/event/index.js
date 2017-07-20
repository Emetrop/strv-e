import * as actionTypes from '../../constants/actionTypes';

export const leaveEvent = id => ({
  type: actionTypes.LEAVE_EVENT,
  id,
});

export const leaveEventRequest = id => ({
  type: actionTypes.LEAVE_EVENT_REQUEST,
  id,
});

export const leaveEventSuccess = id => ({
  type: actionTypes.LEAVE_EVENT_SUCCESS,
  id,
});

export const leaveEventError = errors => ({
  type: actionTypes.LEAVE_EVENT_ERROR,
  error: true,
  payload: errors,
});

export const joinEvent = id => ({
  type: actionTypes.JOIN_EVENT,
  id,
});

export const joinEventRequest = id => ({
  type: actionTypes.JOIN_EVENT_REQUEST,
  id,
});

export const joinEventSuccess = id => ({
  type: actionTypes.JOIN_EVENT_SUCCESS,
  id,
});

export const joinEventError = errors => ({
  type: actionTypes.JOIN_EVENT_ERROR,
  error: true,
  payload: errors,
});
