import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import EventList from '../EventList';
import { getProfileEvents, getUsers } from '../../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends Component {
  render() {
    const { events, users } = this.props;

    return (
      <div>
        <EventList events={events} users={users} />
      </div>
    );
  }
}

Profile.propTypes = {
  events: PropTypes.instanceOf(Immutable.Map),
  users: PropTypes.instanceOf(Immutable.Map),
};

Profile.defaultProps = {
  events: Immutable.Map({}),
  users: Immutable.Map({}),
};

const mapStateToProps = state => ({
  events: getProfileEvents(state),
  users: getUsers(state),
});

export default connect(mapStateToProps)(Profile);
