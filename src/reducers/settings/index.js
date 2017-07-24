import * as Immutable from 'immutable';
import * as actionTypes from '../../constants/actionTypes';
import { eventListViews, eventListFilters } from '../../components/EventList';
import { getCurrentTimestamp } from '../../actions';

const initialState = Immutable.Map({
  eventFilterType: eventListFilters.ALL,
  eventFilterTimestamp: getCurrentTimestamp(),
  eventListView: eventListViews.GRID,
});

const settings = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EVENT_FILTER:
      return state.set('eventFilterType', action.filterType);
    case actionTypes.SET_EVENT_FILTER_TIMESTAMP:
      return state.set('eventFilterTimestamp', action.timestamp);
    case actionTypes.SET_EVENT_LIST_VIEW:
      return state.set('eventListView', action.viewType);
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default settings;
