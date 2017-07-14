/* eslint-disable no-constant-condition */
import { take, put, fork, call, race } from 'redux-saga/effects';
import { SIGNUP_REQUEST, SIGNUP_SUBMIT, SIGNUP_SUCCESS, SIGNUP_ERROR,
         signUpRequest, signUpError, signUpSuccess } from './actions';
import { signUp as signUpAPI } from '../../api';

function* handleSignUpSubmit() {
  while (true) {
    const { payload } = yield take(SIGNUP_SUBMIT);

    yield put(signUpRequest(payload));

    // eslint-disable-next-line no-unused-vars
    const { error, success } = yield race({
      success: take(SIGNUP_SUCCESS),
      error: take(SIGNUP_ERROR),
    });
    // TODO send a response to form
  }
}

function* handleSignUpRequest() {
  while (true) {
    try {
      const { payload } = yield take(SIGNUP_REQUEST);

      const response = yield call(signUpAPI, payload);

      if (response.error) {
        yield put(signUpError(response));
      } else {
        yield put(signUpSuccess(response));
      }
    } catch (e) {
      yield put(signUpError(e));
    }
  }
}

export default function* signUp() {
  yield fork(handleSignUpRequest);
  yield fork(handleSignUpSubmit);
}
