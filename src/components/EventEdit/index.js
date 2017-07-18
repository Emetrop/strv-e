import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { updateEventSubmit } from '../../actions';
import EventForm from '../EventForm';
import { getEventById } from '../../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class EventEdit extends Component {
  render() {
    const { onSubmit, error, event, uid } = this.props;

    if (!event || event.owner !== uid) return <Redirect to="/dashboard" />;

    return (
      <div>
        <EventForm {...event} onSubmit={onSubmit} error={error} />
      </div>
    );
  }
}

EventEdit.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startsAt: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
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

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;

  return ({
    event: getEventById(state, id),
    uid: state.logIn.user.id,
    error: state.eventEdit.error,
  });
};

const mapDispatchToProps = (dispatch, props) => {
  const id = props.match.params.id;

  return {
    onSubmit(target) {
      dispatch(updateEventSubmit({ ...target, id }));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventEdit));
