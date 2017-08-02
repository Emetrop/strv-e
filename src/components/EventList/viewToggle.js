import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import GridIcon from '../../images/grid';
import ListIcon from '../../images/list';
import { setEventListView } from '../../actions';
import { getEventListView } from '../../selectors';

export const eventListViews = {
  GRID: 'GRID',
  LIST: 'LIST',
};

const EventListViewToggle = ({
  setEventListView,
  currentView,
}) => {
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
      <li
        className="listView__item listView__item--first"
        onClick={() => setEventListView(eventListViews.GRID)}
      >
        <GridIcon className={gridClasses} />
      </li>
      <li
        className="listView__item"
        onClick={() => setEventListView(eventListViews.LIST)}
      >
        <ListIcon className={listClasses} />
      </li>
    </ul>
  );
};

EventListViewToggle.propTypes = {
  currentView: PropTypes.oneOf([
    eventListViews.LIST,
    eventListViews.GRID,
  ]).isRequired,
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
