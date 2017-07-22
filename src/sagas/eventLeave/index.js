/* eslint-disable no-constant-condition */
import { take, put, fork, call, race, select } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { normalize } from 'normalizr';
import { leaveEventRequest, leaveEventError, leaveEventSuccess, updateEntity } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { leaveEvent } from '../../api';
import { eventSchema } from '../../schemas';
import { getAuthToken } from '../../selectors';

function* handleLeaveEventSubmit() {
  while (true) {
    const { id } = yield take(actionTypes.LEAVE_EVENT);

    yield put(leaveEventRequest(id));

    yield race({
      success: take(actionTypes.LEAVE_EVENT_SUCCESS),
      error: take(actionTypes.LEAVE_EVENT_ERROR),
    });
  }
}

function* handleLeaveEventRequest() {
  while (true) {
    try {
      const { id } = yield take(actionTypes.LEAVE_EVENT_REQUEST);
      const authToken = yield select(state => getAuthToken(state));
      const response = yield call(leaveEvent, id, authToken);

      if (response.error) {
        yield put(leaveEventError(Immutable.fromJS(response)));
      } else {
        yield put(leaveEventSuccess(Immutable.fromJS(response)));

        const normalizedData = normalize(response, eventSchema);

        const event =
          normalizedData.entities.events[Object.keys(normalizedData.entities.events)[0]];
        const payload = {
          path: ['events', event.id],
          value: Immutable.fromJS(event),
        };

        yield put(updateEntity(payload));
      }
    } catch (e) {
      yield put(leaveEventError(Immutable.fromJS(e)));
    }
  }
}

export default function* update() {
  yield fork(handleLeaveEventRequest);
  yield fork(handleLeaveEventSubmit);
}
