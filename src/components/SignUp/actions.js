// Actions
export const SIGNUP_SUBMIT = 'eventio/signUp/SIGNUP_SUBMIT';
export const SIGNUP_REQUEST = 'eventio/signUp/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'eventio/signUp/SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'eventio/signUp/SIGNUP_ERROR';

// Action Creators
// Triggered whenever the user clicks the signUp submit button
export const signUpSubmit = data => ({
  type: SIGNUP_SUBMIT,
  payload: data,
});

// Triggered whenever a signUp request is dispatched from whenever point in the code
export const signUpRequest = data => ({
  type: SIGNUP_REQUEST,
  payload: data,
});

export const signUpSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

export const signUpError = errors => ({
  type: SIGNUP_ERROR,
  error: true,
  payload: errors,
});
