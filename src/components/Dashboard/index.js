import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { Link } from 'react-router-dom';
import EventList from '../EventList';
import { loadEntities, setEventFilterTimestamp, getCurrentTimestamp } from '../../actions';
import { getFilteredEvents, getEventFilterType } from '../../selectors';
import PageHeader, { PageHeaderMenu } from '../PageHeader';

class Dashboard extends Component {
  componentDidMount() {
    const { loadEntities, setEventFilterTimestamp } = this.props;

    setEventFilterTimestamp(getCurrentTimestamp());
    loadEntities();
  }

  render() {
    const { filteredEvents, filter } = this.props;

    return (
      <div>
        <PageHeader contentRight={<PageHeaderMenu />} />
        <EventList events={filteredEvents.get(filter)} />
        <Link to="/event/new">New event</Link>
      </div>
    );
  }
}

Dashboard.propTypes = {
  filteredEvents: PropTypes.instanceOf(Immutable.Map),
  loadEntities: PropTypes.func.isRequired,
  setEventFilterTimestamp: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {
  filteredEvents: Immutable.Map({}),
};

const mapStateToProps = state => ({
  filteredEvents: getFilteredEvents(state),
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
