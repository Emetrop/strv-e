/* eslint-disable no-constant-condition */
import { take, put, fork, call, race } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { signUpRequest, signUpError, signUpSuccess } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { signUp as signUpAPI } from '../../api';
import history from '../../history';

function* handleSignUpSubmit() {
  while (true) {
    const { payload } = yield take(actionTypes.SIGNUP_SUBMIT);

    yield put(signUpRequest(payload));

    yield race({
      success: take(actionTypes.SIGNUP_SUCCESS),
      error: take(actionTypes.SIGNUP_ERROR),
    });
  }
}

function* handleSignUpRequest() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.SIGNUP_REQUEST);

      const response = yield call(signUpAPI, payload.toObject());

      if (response.error) {
        yield put(signUpError(Immutable.fromJS(response)));
      } else {
        yield put(signUpSuccess(Immutable.fromJS(response)));
        history.push('/login');
      }
    } catch (e) {
      yield put(signUpError(Immutable.fromJS(e)));
    }
  }
}

export default function* signUp() {
  yield fork(handleSignUpRequest);
  yield fork(handleSignUpSubmit);
}
