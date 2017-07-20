import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as Immutable from 'immutable';
import { updateEventSubmit } from '../../actions';
import EventForm from '../EventForm';
import { getEventById, getCurrentUser } from '../../selectors';
import PageHeader, { PageHeaderMenu } from '../PageHeader';

// eslint-disable-next-line react/prefer-stateless-function
class EventEdit extends Component {
  render() {
    const { onSubmit, error, event, user } = this.props;

    if (!event || event.get('owner') !== user.get('id')) return <Redirect to="/dashboard" />;

    return (
      <div>
        <PageHeader contentRight={<PageHeaderMenu />} />
        <EventForm
          title={event.get('title')}
          description={event.get('description')}
          startsAt={event.get('startsAt')}
          capacity={event.get('capacity')}
          onSubmit={onSubmit}
          error={error.toJS()}
        />
      </div>
    );
  }
}

EventEdit.propTypes = {
  event: PropTypes.instanceOf(Immutable.Map).isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
  error: PropTypes.instanceOf(Immutable.Map),
};

EventEdit.defaultProps = {
  error: Immutable.Map({}),
};

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;

  return ({
    event: getEventById(state, id),
    user: getCurrentUser(state),
    error: state.getIn(['eventEdit', 'error']),
  });
};

const mapDispatchToProps = (dispatch, props) => {
  const id = props.match.params.id;

  return {
    onSubmit(target) {
      dispatch(updateEventSubmit(Immutable.fromJS({ ...target, id })));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventEdit));
