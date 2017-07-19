/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import EventForm from '../EventForm';
import { createEventSubmit } from '../../actions';

// eslint-disable-next-line react/prefer-stateless-function
class EventNew extends Component {
  render() {
    const { onSubmit, error } = this.props;

    return (
      <div>
        <EventForm
          onSubmit={onSubmit}
          error={error.toJS()}
        />
      </div>
    );
  }
}

EventNew.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Immutable.Map),
};

EventNew.defaultProps = {
  error: Immutable.Map({}),
};

const mapStateToProps = state => ({
  error: state.getIn(['eventNew', 'error']),
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(createEventSubmit(Immutable.fromJS(values)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventNew);
