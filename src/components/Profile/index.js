import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import EventList from '../EventList';
import { getProfileEvents, getCurrentUser } from '../../selectors';
import ProfileHeader from './header';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends Component {
  render() {
    const { events, user } = this.props;

    return (
      <div>
        <ProfileHeader
          firstName={user.get('firstName')}
          lastName={user.get('lastName')}
          email={user.get('email')}
        />
        <EventList events={events} />
      </div>
    );
  }
}

Profile.propTypes = {
  events: PropTypes.instanceOf(Immutable.Map),
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
};

Profile.defaultProps = {
  events: Immutable.Map({}),
};

const mapStateToProps = state => ({
  events: getProfileEvents(state),
  user: getCurrentUser(state),
});

export default connect(mapStateToProps)(Profile);
