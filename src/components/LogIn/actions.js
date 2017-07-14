// Actions
export const LOGIN_SUBMIT = 'eventio/logIn/LOGIN_SUBMIT';
export const LOGIN_REQUEST = 'eventio/logIn/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'eventio/logIn/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'eventio/logIn/LOGIN_ERROR';
export const LOGOUT = 'eventio/logIn/LOGOUT';

// Action Creators
// Triggered whenever the user clicks the logIn submit button
export const logInSubmit = data => ({
  type: LOGIN_SUBMIT,
  payload: data,
});

// Triggered whenever a logIn request is dispatched from whenever point in the code
export const logInRequest = data => ({
  type: LOGIN_REQUEST,
  payload: data,
});

export const logInSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const logInError = errors => ({
  type: LOGIN_ERROR,
  error: true,
  payload: errors,
});

export const logOut = () => ({
  type: LOGOUT,
});
