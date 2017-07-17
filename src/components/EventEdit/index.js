import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { updateEventSubmit } from './actions';
import EventForm from '../EventForm';

class EventEdit extends Component {
  getCurrentEvent() {
    const { match, events, uid } = this.props;

    return events.find(event => event.id === match.params.id && event.owner.id === uid);
  }

  render() {
    const { onSubmit, error } = this.props;

    const event = this.getCurrentEvent();

    if (!event) return <Redirect to="/dashboard" />;

    return (
      <div>
        <EventForm {...event} onSubmit={onSubmit} error={error} />
      </div>
    );
  }
}

EventEdit.propTypes = {
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
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
// eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })),
  }),
};

EventEdit.defaultProps = {
  error: {},
};

const mapStateToProps = state => ({
  events: state.events,
  uid: state.logIn.user.id,
  error: state.eventEdit.error,
});

const mapDispatchToProps = (dispatch, props) => {
  const id = props.match.params.id;

  return {
    onSubmit(target) {
      dispatch(updateEventSubmit({ ...target, id }));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventEdit));
