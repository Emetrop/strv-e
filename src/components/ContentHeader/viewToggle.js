import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventListViews } from '../EventList';
import { setEventListView } from '../../actions';
import { getEventListView } from '../../selectors';

const EventListViewToggle = ({ setEventListView, currentView }) => (
  <ul>
    <li>
      <span
        role="switch"
        aria-checked="true"
        tabIndex={0}
        className={currentView !== eventListViews.GRID ? '' : 'active'}
        onClick={() => setEventListView(eventListViews.GRID)}
      >Grid view</span>
    </li>
    <li>
      <span
        role="switch"
        aria-checked="false"
        tabIndex={-1}
        className={currentView !== eventListViews.LIST ? '' : 'active'}
        onClick={() => setEventListView(eventListViews.LIST)}
      >List view</span>
    </li>
  </ul>
);

EventListViewToggle.propTypes = {
  currentView: PropTypes.oneOf(
    [eventListViews.LIST, eventListViews.GRID],
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
