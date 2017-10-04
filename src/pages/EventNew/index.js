import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import EventForm from '../../components/EventForm';
import { createEventSubmit, setFormErrors } from '../../actions';
import PageHeader, { PageHeaderLogo } from '../../components/PageHeader';
import { getFormErrors } from '../../selectors';
import { Mobile, Default } from '../../components/Responsive';
import Button, { buttonTypes, buttonColorTypes, buttonSizeTypes } from '../../components/Button';
import CloseIcon from '../../images/close';
import './styles.css';

const EventNew = ({
  onSubmit,
  errors,
  setFormErrors,
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

    if (Object.keys(errors).length > 0) setFormErrors('eventNew', Immutable.fromJS(errors));
    else onSubmit(Immutable.fromJS(values));
  };

  return (
    <div>
      <PageHeader
        contentLeft={<PageHeaderLogo link="/dashboard" />}
        contentRight={
          <div className="eventNew__close">
            <Mobile>
              <Link to="/dashboard" className="eventNew__closeLink">
                <CloseIcon className="eventNew__closeIcon" />
              </Link>
            </Mobile>
            <Default>
              <Link to="/dashboard" className="eventNew__closeLink">
                <CloseIcon className="eventNew__closeIcon" />
                <span className="eventNew__closeText">Close</span>
              </Link>
            </Default>
          </div>
        }
      />
      <div className="eventNew__form">
        <div className="eventNew__content">
          <h1 className="eventNew__title">Create new event</h1>
          <p className="eventNew__hint">Enter details below.</p>
          <EventForm
            onSubmit={handleSubmit}
            errors={errors}
          >
            <div className="eventNew__button">
              <Button
                type={buttonTypes.SUBMIT}
                color={buttonColorTypes.GREEN}
                size={buttonSizeTypes.LARGE}
              >CREATE NEW EVENT</Button>
            </div>
          </EventForm>
        </div>
      </div>
    </div>
  );
};

EventNew.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const mapStateToProps = state => ({
  errors: getFormErrors(state, 'eventNew'),
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(createEventSubmit(values));
  },
  setFormErrors(formName, errors) {
    dispatch(setFormErrors(formName, errors));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventNew);
