import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as filterTypes from '../../constants/eventFilters';
import { filterEvents } from '../../actions';
import { getEventFilterType } from '../../selectors';

const EventListFilter = ({ filterEvents, currentFilter }) => (
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
);

EventListFilter.propTypes = {
  filterEvents: PropTypes.func.isRequired,
  currentFilter: PropTypes.oneOf(
    [filterTypes.ALL, filterTypes.FUTURE, filterTypes.PAST],
  ).isRequired,
};

const mapStateToProps = state => ({
  currentFilter: getEventFilterType(state),
});

const mapDispatchToProps = dispatch => ({
  filterEvents(filter) {
    dispatch(filterEvents(filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListFilter);
