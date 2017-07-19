/* eslint-disable no-constant-condition */
import { take, put, fork, call, race } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { logInRequest, logInError, logInSuccess, mergeEntities } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { logIn, getAuthToken } from '../../api';

function* handleLoginSubmit() {
  while (true) {
    const { payload } = yield take(actionTypes.LOGIN_SUBMIT);

    yield put(logInRequest(payload));

    yield race({
      success: take(actionTypes.LOGIN_SUCCESS),
      error: take(actionTypes.LOGIN_ERROR),
    });
  }
}

function* handleLoginRequest() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.LOGIN_REQUEST);

      const response = yield call(logIn, payload.toObject());

      if (response.error) {
        yield put(logInError(Immutable.fromJS(response)));
      } else {
        const authToken = yield call(getAuthToken, payload);

        yield put(logInSuccess(Immutable.fromJS({ ...response, authToken })));
        yield put(mergeEntities(Immutable.fromJS({ users: { [response.id]: response } })));
      }
    } catch (e) {
      yield put(logInError(Immutable.fromJS(e)));
    }
  }
}

export default function* auth() {
  yield fork(handleLoginRequest);
  yield fork(handleLoginSubmit);
}
