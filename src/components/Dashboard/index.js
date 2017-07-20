import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import EventList from '../EventList';
import { loadEntities, setEventFilterTimestamp, getCurrentTimestamp } from '../../actions';
import { getFilteredEvents, getUsers, getEventFilterType } from '../../selectors';

class Dashboard extends Component {
  componentDidMount() {
    const { loadEntities, setEventFilterTimestamp } = this.props;

    setEventFilterTimestamp(getCurrentTimestamp());
    loadEntities();
  }

  render() {
    const { filteredEvents, users, filter } = this.props;

    return (
      <div>
        <EventList events={filteredEvents.get(filter)} users={users} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  filteredEvents: PropTypes.instanceOf(Immutable.Map),
  users: PropTypes.instanceOf(Immutable.Map),
  loadEntities: PropTypes.func.isRequired,
  setEventFilterTimestamp: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {
  filteredEvents: Immutable.Map({}),
  users: Immutable.Map({}),
};

const mapStateToProps = state => ({
  filteredEvents: getFilteredEvents(state),
  users: getUsers(state),
  filter: getEventFilterType(state),
});

const mapDispatchToProps = dispatch => ({
  loadEntities() {
    dispatch(loadEntities());
  },
  setEventFilterTimestamp(timestamp) {
    dispatch(setEventFilterTimestamp(timestamp));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
