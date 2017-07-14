import { fork } from 'redux-saga/effects';
import dashboard from './components/Dashboard/sagas';
import logIn from './components/LogIn/sagas';
import signUp from './components/SignUp/sagas';

export default function* rootSaga() {
  yield fork(dashboard);
  yield fork(logIn);
  yield fork(signUp);
}
