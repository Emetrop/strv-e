import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventList from '../EventList';
import { loadEvents } from './actions';

class Dashboard extends Component {
  componentDidMount() {
    const { loadEvents } = this.props;
    loadEvents();
  }

  render() {
    const { events } = this.props;

    return (
      <div>
        <EventList events={events} />
      </div>
    );
  }
}

Dashboard.propTypes = {
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
        })),
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  ),
  loadEvents: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  events: [],
};

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  loadEvents() {
    dispatch(loadEvents());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
