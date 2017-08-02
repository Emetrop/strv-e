/* eslint-disable no-constant-condition */
import { take, put, call, select } from 'redux-saga/effects';
import Immutable from 'immutable';
import { normalize } from 'normalizr';
import { joinEventRequest, joinEventError, joinEventSuccess, updateEntity } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { joinEvent } from '../../api';
import { eventSchema } from '../../schemas';
import { getAuthToken } from '../../selectors';

function* eventJoin() {
  while (true) {
    try {
      const { id } = yield take(actionTypes.JOIN_EVENT);

      yield put(joinEventRequest(id));

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

export default eventJoin;
