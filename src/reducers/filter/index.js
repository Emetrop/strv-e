import * as Immutable from 'immutable';
import * as filterTypes from '../../constants/eventFilter';
import * as actionTypes from '../../constants/actionTypes';
import { getCurrentTimestamp } from '../../actions';

const initialState = Immutable.Map({
  eventFilterType: filterTypes.ALL,
  eventFilterTimestamp: getCurrentTimestamp(),
});

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EVENT_FILTER:
      return state.set('eventFilterType', action.filterType);
    case actionTypes.SET_EVENT_FILTER_TIMESTAMP:
      return state.set('eventFilterTimestamp', action.timestamp);
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default filter;
