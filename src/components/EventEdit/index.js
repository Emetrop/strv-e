import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as Immutable from 'immutable';
import { updateEventSubmit, setFormErrors } from '../../actions';
import EventForm from '../EventForm';
import { getEventById, getCurrentUser, getFormErrors } from '../../selectors';
import PageHeader, { PageHeaderMenu } from '../PageHeader';
import ContentHeader from '../ContentHeader';
import EventDelete from './delete';

const EventEdit = ({ onSubmit, errors, event, user, setFormErrors, match }) => {
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = { message: 'Title has to be filled up' };
    }

    if (!values.description) {
      errors.description = { message: 'Description has to be filled up' };
    }

    if (!values.capacity) {
      errors.capacity = { message: 'Capacity has to be filled up' };
    }

    if (!values.date || !values.time) {
      errors.startsAt = { message: 'Date and time have to be filled up' };
    } else if (new Date(values.startsAt).getTime() < Date.now()) {
      errors.startsAt = { message: 'Date and time have to be in future' };
    }

    return errors;
  };

  const handleSubmit = (values) => {
    const errors = validate(values);
    const id = match.params.id;

    if (Object.keys(errors).length > 0) setFormErrors('eventEdit', Immutable.fromJS(errors));
    else onSubmit(Immutable.fromJS({ ...values, id }));
  };

  if (!event || event.get('owner') !== user.get('id')) return <Redirect to="/dashboard" />;

  return (
    <div>
      <PageHeader contentRight={<PageHeaderMenu />} />
      <ContentHeader
        contentLeft={<h3>DETAIL EVENT: #{event.get('id')}</h3>}
        contentRight={<EventDelete id={event.get('id')} />}
      />
      <EventForm
        title={event.get('title')}
        description={event.get('description')}
        startsAt={event.get('startsAt')}
        capacity={event.get('capacity')}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
};

EventEdit.propTypes = {
  event: PropTypes.instanceOf(Immutable.Map).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
  errors: PropTypes.instanceOf(Immutable.Map).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;

  return ({
    event: getEventById(state, id),
    user: getCurrentUser(state),
    errors: getFormErrors(state, 'eventEdit'),
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(updateEventSubmit(values));
  },
  setFormErrors(formName, errors) {
    dispatch(setFormErrors(formName, errors));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventEdit));
