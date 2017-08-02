/* eslint-disable no-constant-condition */
import { take, put, call, select } from 'redux-saga/effects';
import Immutable from 'immutable';
import { createEventRequest, createEventError, createEventSuccess, setFormErrors } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { createEvent } from '../../api';
import history from '../../history';
import { getAuthToken } from '../../selectors';

function* eventNew() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.CREATE_EVENT_SUBMIT);

      yield put(createEventRequest(payload));

      const authToken = yield select(state => getAuthToken(state));
      const response = yield call(createEvent, payload.toObject(), authToken);

      if (response.error) {
        yield put(createEventError(Immutable.fromJS(response)));
        yield put(setFormErrors('eventNew', Immutable.Map(response)));
      } else {
        yield put(createEventSuccess(Immutable.fromJS(response)));
        history.push('/dashboard');
      }
    } catch (e) {
      yield put(createEventError(Immutable.fromJS(e)));
      yield put(setFormErrors('eventNew', Immutable.fromJS(e)));
    }
  }
}

export default eventNew;
