/* eslint-disable no-constant-condition */
import { take, put, call } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { logInRequest, logInError, logInSuccess, mergeEntities, setFormErrors } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { logIn as logInAPI, getAuthToken } from '../../api';

function* logIn() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.LOGIN_SUBMIT);

      yield put(logInRequest(payload));

      const response = yield call(logInAPI, payload.toObject());

      if (response.error) {
        yield put(logInError(Immutable.fromJS(response)));
        yield put(setFormErrors('logIn', Immutable.Map(response)));
      } else {
        const authToken = yield call(getAuthToken, payload.toObject());

        yield put(logInSuccess(Immutable.fromJS({ ...response, authToken })));
        yield put(mergeEntities(Immutable.fromJS({ users: { [response.id]: response } })));
      }
    } catch (e) {
      yield put(logInError(Immutable.fromJS(e)));
      yield put(setFormErrors('logIn', Immutable.Map(e)));
    }
  }
}

export default logIn;
