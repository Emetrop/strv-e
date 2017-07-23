import { fork } from 'redux-saga/effects';
import entities from './entities';
import logIn from './logIn';
import signUp from './signUp';
import eventNew from './eventNew';
import eventEdit from './eventEdit';
import eventJoin from './eventJoin';
import eventLeave from './eventLeave';
import eventDelete from './eventDelete';

export default function* rootSaga() {
  yield fork(entities);
  yield fork(logIn);
  yield fork(signUp);
  yield fork(eventNew);
  yield fork(eventEdit);
  yield fork(eventJoin);
  yield fork(eventLeave);
  yield fork(eventDelete);
}
