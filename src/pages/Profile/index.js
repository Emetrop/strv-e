import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import EventList, { EventListViewToggle } from '../../components/EventList';
import { getProfileEvents, getCurrentUser } from '../../selectors';
import ProfileHeader from './header';
import PageHeader, { PageHeaderMenu, PageHeaderLogo } from '../../components/PageHeader';
import ContentHeader from '../../components/ContentHeader';

const Profile = ({
  events,
  user,
}) => (
  <div>
    <PageHeader
      contentLeft={<PageHeaderLogo link="/dashboard" />}
      contentRight={<PageHeaderMenu />}
    />
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
