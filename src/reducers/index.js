import { combineReducers } from 'redux-immutable';
import entities from './entities';
import logIn from './logIn';
import signUp from './signUp';
import eventNew from './eventNew';
import eventEdit from './eventEdit';
import filter from './filter';

export default combineReducers({
  entities,
  logIn,
  signUp,
  eventNew,
  eventEdit,
  filter,
});
