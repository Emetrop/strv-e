import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import EventList from '../EventList';
import { loadEntities } from '../../actions';
import { getFilteredEvents, getUsers } from '../../selectors';

class Dashboard extends Component {
  componentDidMount() {
    const { loadEntities } = this.props;
    loadEntities();
  }

  render() {
    const { events, users } = this.props;

    return (
      <div>
        <EventList events={events} users={users} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  events: PropTypes.instanceOf(Immutable.Map),
  users: PropTypes.instanceOf(Immutable.Map),
  loadEntities: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  events: Immutable.Map({}),
  users: Immutable.Map({}),
};

const mapStateToProps = (state) => {
  // If we'd just passed the current timestamp to
  // function as an argument we couldn't cache this
  // result with reselect library and it'd be bad...
  const timestamp = Math.floor(Date.now() / 1000000) * 1000000;

  return ({
    events: getFilteredEvents(state, timestamp),
    users: getUsers(state),
  });
};

const mapDispatchToProps = dispatch => ({
  loadEntities() {
    dispatch(loadEntities());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
