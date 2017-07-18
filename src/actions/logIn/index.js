import * as actionTypes from '../../constants/actionTypes';

// Action Creators
// Triggered whenever the user clicks the logIn submit button
export const logInSubmit = data => ({
  type: actionTypes.LOGIN_SUBMIT,
  payload: data,
});

// Triggered whenever a logIn request is dispatched from whenever point in the code
export const logInRequest = data => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: data,
});

export const logInSuccess = data => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: data,
});

export const logInError = errors => ({
  type: actionTypes.LOGIN_ERROR,
  error: true,
  payload: errors,
});

export const logOut = () => ({
  type: actionTypes.LOGOUT,
});
