import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';
import Input, { InputDateTime, inputDateTimeTypes } from '../Input';
import { getInputError } from '../../actions/utils';

const EventForm = ({
  title,
  description,
  capacity,
  startsAt,
  onSubmit,
  errors,
  children,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title: event.target.title.value,
      description: event.target.description.value,
      date: event.target.date.value,
      time: event.target.time.value,
      capacity: event.target.capacity.value,
      startsAt: `${event.target.date.value}T${event.target.time.value}:00.000Z`,
    });
  };

  const formError = getInputError(errors, 'form');

  return (
    <form onSubmit={handleSubmit}>
      {formError && <p className="eventForm__error">{formError}</p>}
      <Input name="title" label="Title" type="text" value={title} error={getInputError(errors, 'title')} />
      <Input name="description" label="Description" type="text" value={description} error={getInputError(errors, 'description')} />
      <InputDateTime name="date" label="Date" type={inputDateTimeTypes.DATE} value={startsAt} error={getInputError(errors, 'startsAt')} />
      <InputDateTime name="time" label="Time" type={inputDateTimeTypes.TIME} value={startsAt} error={getInputError(errors, 'startsAt')} />
      <Input name="capacity" label="Capacity" type="text" value={capacity} error={getInputError(errors, 'capacity')} />
      {children}
    </form>
  );
};

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  capacity: PropTypes.string,
  startsAt: PropTypes.string,
  errors: PropTypes.instanceOf(Immutable.Map).isRequired,
  children: PropTypes.element.isRequired,
};

EventForm.defaultProps = {
  title: '',
  description: '',
  capacity: '',
  startsAt: new Date().toISOString(),
};

export default withRouter(EventForm);
