import * as Immutable from 'immutable';
import * as filterTypes from '../../constants/eventFilter';
import * as actionTypes from '../../constants/actionTypes';

const initialState = Immutable.Map({
  eventFilterType: filterTypes.ALL,
});

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EVENT_FILTER:
      return state.set('eventFilterType', action.filterType);
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default filter;
