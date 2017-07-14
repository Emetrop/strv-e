/* eslint-disable no-constant-condition */
import { take, put, fork, call, race } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_ERROR,
         logInRequest, logInError, logInSuccess } from './actions';
import { logIn, getAuthToken } from '../../api';

function* handleLoginSubmit() {
  while (true) {
    const { payload } = yield take(LOGIN_SUBMIT);

    yield put(logInRequest(payload));

    // eslint-disable-next-line no-unused-vars
    const { error, success } = yield race({
      success: take(LOGIN_SUCCESS),
      error: take(LOGIN_ERROR),
    });
    // TODO send a response to form
  }
}

function* handleLoginRequest() {
  while (true) {
    try {
      const { payload } = yield take(LOGIN_REQUEST);

      const response = yield call(logIn, payload);

      if (response.error) {
        yield put(logInError(response));
      } else {
        const authToken = yield call(getAuthToken, payload);
        yield put(logInSuccess({ ...response, authToken }));
      }
    } catch (e) {
      yield put(logInError(e));
    }
  }
}

export default function* auth() {
  yield fork(handleLoginRequest);
  yield fork(handleLoginSubmit);
}
