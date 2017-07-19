import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import EventList from '../EventList';
import { loadEntities } from '../../actions';
import { getEvents, getUsers } from '../../selectors';

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

const mapStateToProps = state => ({
  events: getEvents(state),
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  loadEntities() {
    dispatch(loadEntities());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
