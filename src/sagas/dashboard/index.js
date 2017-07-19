/* eslint-disable no-constant-condition */
import { take, put, fork, call, race } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import { loadEntitiesRequest, loadEntitiesError, loadEntitiesSuccess } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { getEvents } from '../../api';
import { eventSchema } from '../../schemas';

function* handleLoadEntities() {
  while (true) {
    yield take(actionTypes.LOAD_ENTITIES);

    yield put(loadEntitiesRequest());

    // eslint-disable-next-line no-unused-vars
    const { error, success } = yield race({
      success: take(actionTypes.LOAD_ENTITIES_SUCCESS),
      error: take(actionTypes.LOAD_ENTITIES_ERROR),
    });
  }
}

function* handleLoadEntitiesRequest() {
  while (true) {
    try {
      yield take(actionTypes.LOAD_ENTITIES_REQUEST);

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

export default function* events() {
  yield fork(handleLoadEntities);
  yield fork(handleLoadEntitiesRequest);
}
