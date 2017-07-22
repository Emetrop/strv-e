/* eslint-disable no-constant-condition */
import { take, put, fork, call, race, select } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { deleteEventRequest, deleteEventError, deleteEventSuccess, deleteEntity } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { deleteEvent } from '../../api';
import history from '../../history';
import { getAuthToken } from '../../selectors';

function* handleDeleteEventSubmit() {
  while (true) {
    const { id } = yield take(actionTypes.DELETE_EVENT);

    yield put(deleteEventRequest(id));

    yield race({
      success: take(actionTypes.DELETE_EVENT_SUCCESS),
      error: take(actionTypes.DELETE_EVENT_ERROR),
    });
  }
}

function* handleDeleteEventRequest() {
  while (true) {
    try {
      const { id } = yield take(actionTypes.DELETE_EVENT_REQUEST);
      const authToken = yield select(state => getAuthToken(state));
      const response = yield call(deleteEvent, id, authToken);

      if (response.error) {
        yield put(deleteEventError(response));
      } else {
        yield put(deleteEventSuccess(id));

        history.push('/dashboard');
        yield put(deleteEntity(['events', id]));
      }
    } catch (e) {
      yield put(deleteEventError(Immutable.fromJS(e)));
    }
  }
}

export default function* eventDelete() {
  yield fork(handleDeleteEventRequest);
  yield fork(handleDeleteEventSubmit);
}
