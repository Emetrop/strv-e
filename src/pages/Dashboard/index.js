import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import EventList, { EventListFilter, EventListViewToggle } from '../../components/EventList';
import { loadEntities, setEventFilterTimestamp, getCurrentTimestamp } from '../../actions';
import { getFilteredEvents, getEventFilterType } from '../../selectors';
import PageHeader, { PageHeaderMenu, PageHeaderLogo } from '../../components/PageHeader';
import ContentHeader from '../../components/ContentHeader';
import { NewEventButton } from '../../components/NewEventButton';

class Dashboard extends Component {
  componentDidMount() {
    const {
      loadEntities,
      setEventFilterTimestamp,
    } = this.props;

    setEventFilterTimestamp(getCurrentTimestamp());
    loadEntities();
  }

  render() {
    const {
      filteredEvents,
      filter,
    } = this.props;

    return (
      <div>
        <PageHeader
          contentLeft={<PageHeaderLogo link="/dashboard" />}
          contentRight={<PageHeaderMenu />}
        />
        <ContentHeader
          contentLeft={<EventListFilter />}
          contentRight={<EventListViewToggle />}
        />
        <EventList events={filteredEvents.get(filter)} />
        <NewEventButton />
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
