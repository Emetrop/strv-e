/* eslint-disable no-constant-condition */
import { take, put, fork, call } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import { loadEntitiesRequest, loadEntitiesError, loadEntitiesSuccess } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { getEvents } from '../../api';
import { eventSchema } from '../../schemas';

function* handleLoadEntities() {
  while (true) {
    try {
      yield take(actionTypes.LOAD_ENTITIES);

      yield put(loadEntitiesRequest());

      const response = yield call(getEvents);

      if (response.error) {
        yield put(loadEntitiesError(response));
      } else {
        const normalizedData = normalize(response, [eventSchema]);
        yield put(loadEntitiesSuccess(fromJS(normalizedData.entities)));
      }
    } catch (e) {
      yield put(loadEntitiesError(e));
    }
  }
}

export default function* entities() {
  yield fork(handleLoadEntities);
}
