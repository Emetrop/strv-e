/* eslint-disable no-constant-condition */
import { take, put, fork, call, race, select } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { createEventRequest, createEventError, createEventSuccess } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { createEvent } from '../../api';
import history from '../../history';
import { getAuthToken } from '../../selectors';

function* handleCreateEventSubmit() {
  while (true) {
    const { payload } = yield take(actionTypes.CREATE_EVENT_SUBMIT);

    yield put(createEventRequest(payload));

    yield race({
      success: take(actionTypes.CREATE_EVENT_SUCCESS),
      error: take(actionTypes.CREATE_EVENT_ERROR),
    });
  }
}

function* handleCreateEventRequest() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.CREATE_EVENT_REQUEST);
      const authToken = yield select(state => getAuthToken(state));
      const response = yield call(createEvent, payload.toObject(), authToken);

      if (response.error) {
        yield put(createEventError(Immutable.fromJS(response)));
      } else {
        yield put(createEventSuccess(Immutable.fromJS(response)));
        history.push('/dashboard');
      }
    } catch (e) {
      yield put(createEventError(Immutable.fromJS(e)));
    }
  }
}

export default function* create() {
  yield fork(handleCreateEventRequest);
  yield fork(handleCreateEventSubmit);
}
