import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as viewTypes from '../../constants/eventListViews';
import { setEventListView } from '../../actions';
import { getEventListView } from '../../selectors';

const EventListViewToggle = ({ setEventListView, currentView }) => (
  <ul>
    <li>
      <span
        role="switch"
        aria-checked="true"
        tabIndex={0}
        className={currentView !== viewTypes.GRID ? '' : 'active'}
        onClick={() => setEventListView(viewTypes.GRID)}
      >Grid view</span>
    </li>
    <li>
      <span
        role="switch"
        aria-checked="false"
        tabIndex={-1}
        className={currentView !== viewTypes.LIST ? '' : 'active'}
        onClick={() => setEventListView(viewTypes.LIST)}
      >List view</span>
    </li>
  </ul>
);

EventListViewToggle.propTypes = {
  currentView: PropTypes.oneOf(
    [viewTypes.LIST, viewTypes.GRID],
  ).isRequired,
  setEventListView: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentView: getEventListView(state),
});

const mapDispatchToProps = dispatch => ({
  setEventListView(viewType) {
    dispatch(setEventListView(viewType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListViewToggle);
