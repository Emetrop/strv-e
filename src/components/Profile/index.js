import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import EventList, { EventListViewToggle } from '../EventList';
import { getProfileEvents, getCurrentUser } from '../../selectors';
import ProfileHeader from './header';
import PageHeader, { PageHeaderMenu } from '../PageHeader';
import ContentHeader from '../ContentHeader';

const Profile = ({ events, user }) => (
  <div>
    <PageHeader contentRight={<PageHeaderMenu />} />
    <ProfileHeader
      firstName={user.get('firstName')}
      lastName={user.get('lastName')}
      email={user.get('email')}
    />
    <ContentHeader
      contentLeft={<h1 className="profileHeader__title">My Events</h1>}
      contentRight={<EventListViewToggle />}
      middlePosition
    />
    <EventList events={events} />
  </div>
);

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
