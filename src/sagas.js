import { fork } from 'redux-saga/effects';
import dashboard from './components/Dashboard/sagas';
import logIn from './components/LogIn/sagas';
import signUp from './components/SignUp/sagas';
import eventNew from './components/EventNew/sagas';
import eventEdit from './components/EventEdit/sagas';

export default function* rootSaga() {
  yield fork(dashboard);
  yield fork(logIn);
  yield fork(signUp);
  yield fork(eventNew);
  yield fork(eventEdit);
}
