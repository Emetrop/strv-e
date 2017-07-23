import { combineReducers } from 'redux-immutable';
import entities from './entities';
import loggedInUser from './loggedInUser';
import settings from './settings';
import forms from './forms';

export default combineReducers({
  entities,
  loggedInUser,
  settings,
  forms,
});
