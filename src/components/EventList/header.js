import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as filterTypes from '../../constants/eventFilter';
import { filterEvents } from '../../actions';
import { getCurrentEventFilter } from '../../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class EventListHeader extends Component {
  render() {
    const { filterEvents, currentFilter } = this.props;

    return (
      <div>
        <ul>
          <li>
            <span
              role="switch"
              aria-checked="false"
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
      </div>
    );
  }
}

EventListHeader.propTypes = {
  filterEvents: PropTypes.func.isRequired,
  currentFilter: PropTypes.oneOf(
    [filterTypes.ALL, filterTypes.FUTURE, filterTypes.PAST],
  ).isRequired,
};

const mapStateToProps = state => ({
  currentFilter: getCurrentEventFilter(state),
});

const mapDispatchToProps = dispatch => ({
  filterEvents(filter) {
    dispatch(filterEvents(filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListHeader);
