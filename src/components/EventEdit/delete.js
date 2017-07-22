import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions';

const EventDelete = ({ id, deleteEvent }) => (
  <span
    role="button"
    tabIndex={0}
    onClick={() => deleteEvent(id)}
  >DELETE EVENT</span>
);

EventDelete.propTypes = {
  id: PropTypes.string.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  deleteEvent(id) {
    dispatch(deleteEvent(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDelete);
