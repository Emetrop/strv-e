/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventForm from '../EventForm';
import { createEventSubmit } from './actions';

// eslint-disable-next-line react/prefer-stateless-function
class EventNew extends Component {
  render() {
    return (
      <div>
        <EventForm {...this.props} />
      </div>
    );
  }
}

EventNew.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })),
  }),
};

EventNew.defaultProps = {
  error: {},
};

const mapStateToProps = state => ({
  error: state.eventNew.error,
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(createEventSubmit(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventNew);
