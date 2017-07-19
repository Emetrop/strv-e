import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import messages from './errorMessages';
import Input from '../Input';
import InputDateTime from '../InputDateTime';

class EventForm extends Component {
  getInputError(fieldName) {
    const { error } = this.props;

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
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSubmit } = this.props;

    onSubmit({
      title: event.target.title.value,
      description: event.target.description.value,
      startsAt: `${event.target.date.value}T${event.target.time.value}:00.000Z`,
      capacity: event.target.capacity.value,
    });
  }

  render() {
    const {
      title,
      description,
      capacity,
      startsAt,
    } = this.props;

    const formError = this.getInputError('form');

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {formError && <p>{formError}</p>}
        <Input name="title" label="Title" type="text" value={title} error={this.getInputError('title')} />
        <Input name="description" label="Description" type="text" value={description} error={this.getInputError('description')} />
        <InputDateTime name="date" label="Date" type="date" value={startsAt} error={this.getInputError('startsAt')} />
        <InputDateTime name="time" label="Time" type="time" value={startsAt} error={this.getInputError('startsAt')} />
        <Input name="capacity" label="Capacity" type="number" value={capacity.toString()} min="1" error={this.getInputError('capacity')} />
        <button type="submit">Save</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  capacity: PropTypes.number,
  startsAt: PropTypes.string,
  error: PropTypes.shape({
    error: PropTypes.string,
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })),
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
