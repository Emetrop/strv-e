import * as actionTypes from '../../constants/actionTypes';

// Triggered whenever the user clicks the signUp submit button
export const signUpSubmit = data => ({
  type: actionTypes.SIGNUP_SUBMIT,
  payload: data,
});

// Triggered whenever a signUp request is dispatched from whenever point in the code
export const signUpRequest = data => ({
  type: actionTypes.SIGNUP_REQUEST,
  payload: data,
});

export const signUpSuccess = data => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: data,
});

export const signUpError = errors => ({
  type: actionTypes.SIGNUP_ERROR,
  error: true,
  payload: errors,
});
