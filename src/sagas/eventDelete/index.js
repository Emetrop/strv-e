/* eslint-disable no-constant-condition */
import { take, put, call, select } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { deleteEventRequest, deleteEventError, deleteEventSuccess, deleteEntity } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { deleteEvent } from '../../api';
import history from '../../history';
import { getAuthToken } from '../../selectors';

function* eventDelete() {
  while (true) {
    try {
      const { id } = yield take(actionTypes.DELETE_EVENT);

      yield put(deleteEventRequest(id));

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

export default eventDelete;
