import { combineReducers } from 'redux';
import entities from './entities';
import logIn from './logIn';
import signUp from './signUp';
import eventNew from './eventNew';
import eventEdit from './eventEdit';

export default combineReducers({
  entities,
  logIn,
  signUp,
  eventNew,
  eventEdit,
});
