import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Event from '../Event';
import { getEventById, getUserByEventAuthorId } from '../../selectors';

const EventDetail = ({ event, user }) => (
  <div>
    <Event
      title={event.get('title')}
      description={event.get('description')}
      startsAt={event.get('startsAt')}
      capacity={event.get('capacity')}
      attendees={event.get('attendees').size}
      firstName={user.get('firstName')}
      lastName={user.get('lastName')}
      id={event.get('id')}
    />
  </div>
);

EventDetail.propTypes = {
// eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  event: PropTypes.object,
// eslint-disable-next-line react/require-default-props,react/forbid-prop-types
  user: PropTypes.object,
};

const mapStateToProps = (state, params) => {
  const id = params.match.params.id;

  return {
    event: getEventById(state, id),
    user: getUserByEventAuthorId(state, id),
  };
};

export default connect(mapStateToProps)(EventDetail);
