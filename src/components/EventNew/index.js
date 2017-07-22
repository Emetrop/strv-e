import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import { Link } from 'react-router-dom';
import EventForm from '../EventForm';
import { createEventSubmit } from '../../actions';
import PageHeader from '../PageHeader';

const EventNew = ({ onSubmit, error }) => (
  <div>
    <PageHeader
      contentRight={<Link to="/dashboard">Close</Link>}
    />
    <EventForm
      onSubmit={onSubmit}
      error={error.toJS()}
    />
  </div>
);

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
