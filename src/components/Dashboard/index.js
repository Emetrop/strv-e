import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        <EventList events={Object.values(events)} users={users} />
      </div>
    );
  }
}

Dashboard.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  events: PropTypes.object,
// eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object,
  loadEntities: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  events: {},
  users: {},
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
