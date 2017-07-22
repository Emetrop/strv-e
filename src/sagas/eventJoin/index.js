/* eslint-disable no-constant-condition */
import { take, put, fork, call, race, select } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { normalize } from 'normalizr';
import { joinEventRequest, joinEventError, joinEventSuccess, updateEntity } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { joinEvent } from '../../api';
import { eventSchema } from '../../schemas';
import { getAuthToken } from '../../selectors';

function* handleJoinEventSubmit() {
  while (true) {
    const { id } = yield take(actionTypes.JOIN_EVENT);

    yield put(joinEventRequest(id));

    yield race({
      success: take(actionTypes.JOIN_EVENT_SUCCESS),
      error: take(actionTypes.JOIN_EVENT_ERROR),
    });
  }
}

function* handleJoinEventRequest() {
  while (true) {
    try {
      const { id } = yield take(actionTypes.JOIN_EVENT_REQUEST);
      const authToken = yield select(state => getAuthToken(state));
      const response = yield call(joinEvent, id, authToken);

      if (response.error) {
        yield put(joinEventError(Immutable.fromJS(response)));
      } else {
        yield put(joinEventSuccess(Immutable.fromJS(response)));

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
      yield put(joinEventError(Immutable.fromJS(e)));
    }
  }
}

export default function* update() {
  yield fork(handleJoinEventRequest);
  yield fork(handleJoinEventSubmit);
}
