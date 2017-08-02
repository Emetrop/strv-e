/* eslint-disable no-constant-condition */
import { take, put, call, select } from 'redux-saga/effects';
import Immutable from 'immutable';
import { normalize } from 'normalizr';
import { leaveEventRequest, leaveEventError, leaveEventSuccess, updateEntity } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { leaveEvent } from '../../api';
import { eventSchema } from '../../schemas';
import { getAuthToken } from '../../selectors';

function* eventLeave() {
  while (true) {
    try {
      const { id } = yield take(actionTypes.LEAVE_EVENT);

      yield put(leaveEventRequest(id));

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

export default eventLeave;
