import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventList from '../EventList';
import { getProfileEvents } from '../../reducers';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends Component {
  render() {
    const { events } = this.props;

    return (
      <div>
        <EventList events={events} />
      </div>
    );
  }
}

Profile.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
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
  ),
};

Profile.defaultProps = {
  events: [],
};

const mapStateToProps = state => ({
  events: getProfileEvents(state),
});

export default connect(mapStateToProps)(Profile);
