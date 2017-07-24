import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions';
import { Default, Mobile } from '../Responsive';

const EventDelete = ({ id, deleteEvent }) => {
  const handleDelete = () => {
// eslint-disable-next-line no-alert
    if (confirm('Delete the item?')) {
      deleteEvent(id);
    }
  };

  return (
    <span>
      <Mobile>
        <span
          role="button"
          tabIndex={0}
          onClick={handleDelete}
          className="eventEdit__delete"
        ><span className="eventEdit__deleteIcon" /></span>
      </Mobile>
      <Default>
        <span
          role="button"
          tabIndex={0}
          onClick={handleDelete}
          className="eventEdit__delete"
        ><span className="eventEdit__deleteIcon" /><span>DELETE EVENT</span></span>
      </Default>
    </span>
  );
};

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
