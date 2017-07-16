import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Event from '../Event';
import { getEventById } from '../../reducers';

const EventDetail = ({ event }) => (
  <div>
    <Event {...event} />
  </div>
);

EventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startsAt: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    attendees: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, params) => {
  const id = params.match.params.id;

  return {
    event: getEventById(state, id),
  };
};

export default connect(mapStateToProps)(EventDetail);
