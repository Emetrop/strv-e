import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as filterTypes from '../../constants/eventFilters';
import * as viewTypes from '../../constants/eventListViews';
import { filterEvents, setEventListView } from '../../actions';
import { getEventFilterType, getEventListView } from '../../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class EventListHeader extends Component {
  render() {
    const { filterEvents, currentFilter, setEventListView, currentView } = this.props;

    return (
      <div>
        <ul>
          <li>
            <span
              role="switch"
              aria-checked="true"
              tabIndex={0}
              className={currentFilter !== filterTypes.ALL ? '' : 'active'}
              onClick={() => filterEvents(filterTypes.ALL)}
            >All Events</span>
          </li>
          <li>
            <span
              role="switch"
              aria-checked="false"
              tabIndex={-1}
              className={currentFilter !== filterTypes.FUTURE ? '' : 'active'}
              onClick={() => filterEvents(filterTypes.FUTURE)}
            >Future Events</span>
          </li>
          <li>
            <span
              role="switch"
              aria-checked="false"
              tabIndex={-2}
              className={currentFilter !== filterTypes.PAST ? '' : 'active'}
              onClick={() => filterEvents(filterTypes.PAST)}
            >Past Events</span>
          </li>
        </ul>
        <div>
          <span
            role="switch"
            aria-checked="true"
            tabIndex={0}
            className={currentView !== viewTypes.GRID ? '' : 'active'}
            onClick={() => setEventListView(viewTypes.GRID)}
          >Grid view</span>
          <span
            role="switch"
            aria-checked="false"
            tabIndex={-1}
            className={currentView !== viewTypes.LIST ? '' : 'active'}
            onClick={() => setEventListView(viewTypes.LIST)}
          >List view</span>
        </div>
      </div>
    );
  }
}

EventListHeader.propTypes = {
  filterEvents: PropTypes.func.isRequired,
  currentFilter: PropTypes.oneOf(
    [filterTypes.ALL, filterTypes.FUTURE, filterTypes.PAST],
  ).isRequired,
  currentView: PropTypes.oneOf(
    [viewTypes.LIST, viewTypes.GRID],
  ).isRequired,
  setEventListView: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentFilter: getEventFilterType(state),
  currentView: getEventListView(state),
});

const mapDispatchToProps = dispatch => ({
  filterEvents(filter) {
    dispatch(filterEvents(filter));
  },
  setEventListView(viewType) {
    dispatch(setEventListView(viewType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListHeader);
