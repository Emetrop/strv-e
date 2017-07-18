/* eslint-disable no-constant-condition */
import { take, put, fork, call, race } from 'redux-saga/effects';
import { logInRequest, logInError, logInSuccess, mergeEntities } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { logIn, getAuthToken } from '../../api';

function* handleLoginSubmit() {
  while (true) {
    const { payload } = yield take(actionTypes.LOGIN_SUBMIT);

    yield put(logInRequest(payload));

    // eslint-disable-next-line no-unused-vars
    const { error, success } = yield race({
      success: take(actionTypes.LOGIN_SUCCESS),
      error: take(actionTypes.LOGIN_ERROR),
    });
    // TODO send a response to form
  }
}

function* handleLoginRequest() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.LOGIN_REQUEST);

      const response = yield call(logIn, payload);

      if (response.error) {
        yield put(logInError(response));
      } else {
        const authToken = yield call(getAuthToken, payload);
        yield put(logInSuccess({ ...response, authToken }));
        yield put(mergeEntities({ users: { [response.id]: response } }));
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
