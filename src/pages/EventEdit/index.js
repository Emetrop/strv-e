import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Immutable from 'immutable';
import { updateEventSubmit, setFormErrors } from '../../actions/index';
import EventForm from '../../components/EventForm/index';
import { getEventWithAuthorAndAttendees, getCurrentUser, getFormErrors } from '../../selectors';
import PageHeader, { PageHeaderMenu, PageHeaderLogo } from '../../components/PageHeader/index';
import ContentHeader from '../../components/ContentHeader/index';
import EventAttendees from '../../components/EventAttendees/index';
import EventDelete from './delete';
import EventEditConfirmButton from './confirmButton';
import { Mobile, Default } from '../../components/Responsive/index';
import './styles.css';

const EventEdit = ({
  onSubmit,
  errors,
  event,
  user,
  setFormErrors,
  match,
}) => {
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
    } else if (!isFinite(values.capacity) || parseInt(values.capacity, 10) < 1) {
      errors.capacity = { message: 'Capacity has to be a number bigger then 0' };
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

  if (!event || event.getIn(['owner', 'id']) !== user.get('id')) return <Redirect to="/dashboard" />;

  return (
    <div>
      <PageHeader
        contentLeft={<PageHeaderLogo link="/dashboard" />}
        contentRight={<PageHeaderMenu />}
      />
      <ContentHeader
        contentLeft={
          <div>
            <Mobile>
              <h3 className="eventEdit__title">DETAIL EVENT:<br />#{event.get('id')}</h3>
            </Mobile>
            <Default>
              <h3 className="eventEdit__title">DETAIL EVENT: #{event.get('id')}</h3>
            </Default>
          </div>
          }
        contentRight={<EventDelete id={event.get('id')} />}
      />
      <div className="containerResponsive">
        <div className="eventEdit__event">
          <div className="eventEdit__eventContent">
            <EventForm
              title={event.get('title')}
              description={event.get('description')}
              startsAt={event.get('startsAt')}
              capacity={event.get('capacity').toString()}
              onSubmit={handleSubmit}
              errors={errors}
            >
              <EventEditConfirmButton />
            </EventForm>
          </div>
        </div>
        <Default>
          <div className="eventEdit__attendees">
            <EventAttendees
              currentUserID={user.get('id')}
              users={event.has('attendees') ? event.get('attendees').toJS() : []}
            />
          </div>
        </Default>
      </div>
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
    event: getEventWithAuthorAndAttendees(state, id),
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
