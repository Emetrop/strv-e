/* eslint-disable no-constant-condition */
import { take, put, call, select } from 'redux-saga/effects';
import * as Immutable from 'immutable';
import { updateEventRequest, updateEventError, updateEventSuccess, setFormErrors } from '../../actions';
import * as actionTypes from '../../constants/actionTypes';
import { updateEvent } from '../../api';
import history from '../../history';
import { getAuthToken } from '../../selectors';

function* eventEdit() {
  while (true) {
    try {
      const { payload } = yield take(actionTypes.UPDATE_EVENT_SUBMIT);

      yield put(updateEventRequest(payload));

      const authToken = yield select(state => getAuthToken(state));
      const response = yield call(updateEvent, payload.toObject(), authToken);

      if (response.error) {
        yield put(updateEventError(Immutable.fromJS(response)));
        yield put(setFormErrors('eventEdit', Immutable.Map(response)));
      } else {
        yield put(updateEventSuccess(Immutable.fromJS(response)));
        history.push('/dashboard');
      }
    } catch (e) {
      yield put(updateEventError(Immutable.fromJS(e)));
      yield put(setFormErrors('eventEdit', Immutable.fromJS(e)));
    }
  }
}

export default eventEdit;
