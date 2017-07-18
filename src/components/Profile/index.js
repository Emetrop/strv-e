import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventList from '../EventList';
import { getProfileEvents, getUsers } from '../../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends Component {
  render() {
    const { events, users } = this.props;

    return (
      <div>
        <EventList events={Object.values(events)} users={users} />
      </div>
    );
  }
}

Profile.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  events: PropTypes.array,
// eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object,
};

Profile.defaultProps = {
  events: [],
  users: {},
};

const mapStateToProps = state => ({
  events: getProfileEvents(state),
  users: getUsers(state),
});

export default connect(mapStateToProps)(Profile);
