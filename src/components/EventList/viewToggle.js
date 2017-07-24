import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import gridIcon from '../../images/grid.svg';
import listIcon from '../../images/list.svg';
import { setEventListView } from '../../actions';
import { getEventListView } from '../../selectors';

export const eventListViews = {
  GRID: 'GRID',
  LIST: 'LIST',
};

const EventListViewToggle = ({ setEventListView, currentView }) => {
  const gridClasses = classnames({
    listView__icon: true,
    'listView__icon--active': currentView === eventListViews.GRID,
  });

  const listClasses = classnames({
    listView__icon: true,
    'listView__icon--active': currentView === eventListViews.LIST,
  });

  return (
    <ul className="listView">
      <li className="listView__item listView__item--first">
        <img
          src={gridIcon}
          alt="Grid view"
          className={gridClasses}
          onClick={() => setEventListView(eventListViews.GRID)}
        />
      </li>
      <li className="listView__item">
        <img
          src={listIcon}
          alt="List view"
          className={listClasses}
          onClick={() => setEventListView(eventListViews.LIST)}
        />
      </li>
    </ul>
  );
};

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
