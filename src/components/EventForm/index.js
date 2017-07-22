import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import messages from './errorMessages';
import Input from '../Input';
import InputDateTime from '../InputDateTime';

const EventForm = ({ title, description, capacity, startsAt, onSubmit, error }) => {
  const getInputError = (fieldName) => {
    if (!error) return '';

    const fieldError = !error.errors ? false : error.errors.find(e => e.path === fieldName);

    // Error with defined field
    if (fieldError) {
      const message = messages.find(m => m.id === fieldError.message && m.field === fieldName);

      return message ? message.message : fieldError.message;
    }

    // Error without defined field
    const generalError = messages.find(m => m.id === error.error && m.field === fieldName);

    return !generalError ? '' : generalError.message;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title: event.target.title.value,
      description: event.target.description.value,
      startsAt: `${event.target.date.value}T${event.target.time.value}:00.000Z`,
      capacity: event.target.capacity.value,
    });
  };

  const formError = getInputError('form');

  return (
    <form onSubmit={handleSubmit}>
      {formError && <p>{formError}</p>}
      <Input name="title" label="Title" type="text" value={title} error={getInputError('title')} />
      <Input name="description" label="Description" type="text" value={description} error={getInputError('description')} />
      <InputDateTime name="date" label="Date" type="date" value={startsAt} error={getInputError('startsAt')} />
      <InputDateTime name="time" label="Time" type="time" value={startsAt} error={getInputError('startsAt')} />
      <Input name="capacity" label="Capacity" type="number" value={capacity.toString()} min="1" error={getInputError('capacity')} />
      <button type="submit">Save</button>
    </form>
  );
};

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  capacity: PropTypes.number,
  startsAt: PropTypes.string,
  error: PropTypes.shape({
    error: PropTypes.string,
    errors: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  }),
};

EventForm.defaultProps = {
  title: '',
  description: '',
  capacity: 10,
  startsAt: '',
  error: {},
};

export default withRouter(EventForm);
