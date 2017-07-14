/* eslint-disable no-constant-condition */
import { take, put, fork, call, race } from 'redux-saga/effects';
import { LOAD_EVENTS, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_ERROR,
         loadEventsRequest, loadEventsError, loadEventsSuccess } from './actions';
import { getEvents } from '../../api';

function* handleLoadEvents() {
  while (true) {
    yield take(LOAD_EVENTS);

    yield put(loadEventsRequest());

    // eslint-disable-next-line no-unused-vars
    const { error, success } = yield race({
      success: take(LOAD_EVENTS_SUCCESS),
      error: take(LOAD_EVENTS_ERROR),
    });
    // TODO send a response to form
  }
}

function* handleLoadEventsRequest() {
  while (true) {
    try {
      yield take(LOAD_EVENTS_REQUEST);

      const response = yield call(getEvents);

      if (response.error) {
        yield put(loadEventsError(response));
      } else {
        yield put(loadEventsSuccess(response));
      }
    } catch (e) {
      yield put(loadEventsError(e));
    }
  }
}

export default function* events() {
  yield fork(handleLoadEvents);
  yield fork(handleLoadEventsRequest);
}
