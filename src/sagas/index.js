import { fork } from 'redux-saga/effects';
import dashboard from './dashboard';
import logIn from './logIn';
import signUp from './signUp';
import eventNew from './eventNew';
import eventEdit from './eventEdit';
import eventJoin from './eventJoin';
import eventLeave from './eventLeave';

export default function* rootSaga() {
  yield fork(dashboard);
  yield fork(logIn);
  yield fork(signUp);
  yield fork(eventNew);
  yield fork(eventEdit);
  yield fork(eventJoin);
  yield fork(eventLeave);
}
