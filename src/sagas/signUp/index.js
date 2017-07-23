/* eslint-disable no-constant-condition */
import { take, put, call } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { signUpRequest, signUpError, signUpSuccess, setFormErrors } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { signUp as signUpAPI } from '../../api';
import history from '../../history';

function* signUp() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.SIGNUP_SUBMIT);

      yield put(signUpRequest(payload));

      const response = yield call(signUpAPI, payload.toObject());

      if (response.error) {
        yield put(signUpError(Immutable.fromJS(response)));
        yield put(setFormErrors('signUp', Immutable.fromJS(response)));
      } else {
        yield put(signUpSuccess(Immutable.fromJS(response)));
        history.push('/login');
      }
    } catch (e) {
      yield put(signUpError(Immutable.fromJS(e)));
      yield put(setFormErrors('signUp', Immutable.fromJS(e)));
    }
  }
}

export default signUp;
