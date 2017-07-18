import { fork } from 'redux-saga/effects';
import dashboard from './dashboard';
import logIn from './logIn';
import signUp from './signUp';
import eventNew from './eventNew';
import eventEdit from './eventEdit';

export default function* rootSaga() {
  yield fork(dashboard);
  yield fork(logIn);
  yield fork(signUp);
  yield fork(eventNew);
  yield fork(eventEdit);
}
