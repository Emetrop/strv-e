/* eslint-disable no-constant-condition */
import { take, put, fork, call, race, select } from 'redux-saga/effects';
import { createEventRequest, createEventError, createEventSuccess } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { createEvent } from '../../api';

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
      const authToken = yield select(state => state.logIn.user.authToken);
      const response = yield call(createEvent, payload, authToken);

      if (response.error) {
        yield put(createEventError(response));
      } else {
        yield put(createEventSuccess(response));
      }
    } catch (e) {
      yield put(createEventError(e));
    }
  }
}

export default function* create() {
  yield fork(handleCreateEventRequest);
  yield fork(handleCreateEventSubmit);
}
