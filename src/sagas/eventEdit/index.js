/* eslint-disable no-constant-condition */
import { take, put, fork, call, race, select } from 'redux-saga/effects';
import { updateEventRequest, updateEventError, updateEventSuccess } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { updateEvent } from '../../api';

function* handleUpdateEventSubmit() {
  while (true) {
    const { payload } = yield take(actionTypes.UPDATE_EVENT_SUBMIT);

    yield put(updateEventRequest(payload));

    yield race({
      success: take(actionTypes.UPDATE_EVENT_SUCCESS),
      error: take(actionTypes.UPDATE_EVENT_ERROR),
    });
  }
}

function* handleUpdateEventRequest() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.UPDATE_EVENT_REQUEST);
      const authToken = yield select(state => state.logIn.user.authToken);

      const response = yield call(updateEvent, payload, authToken);

      if (response.error) {
        yield put(updateEventError(response));
      } else {
        yield put(updateEventSuccess(response));
      }
    } catch (e) {
      yield put(updateEventError(e));
    }
  }
}

export default function* update() {
  yield fork(handleUpdateEventRequest);
  yield fork(handleUpdateEventSubmit);
}
