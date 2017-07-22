import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import Input from '../Input';
import messages from './errorMessages';
import { signUpSubmit } from '../../actions';

const SignUp = ({ onSubmit, error }) => {
  const getInputError = (fieldName) => {
    if (!error) return '';

    // Error with defined field
    if (error.has('errors') && error.get('errors').has(fieldName)) {
      const message = messages.find(m => m.id === error.getIn(['errors', fieldName, 'message']) && m.field === fieldName);

      return message ? message.message : error.getIn(['errors', fieldName, 'message']);
    }

    // Error without defined field
    const generalError = messages.find(m => m.id === error.get('error') && m.field === fieldName);

    return generalError ? generalError.message : '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(Immutable.fromJS({
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    }));
  };

  const formError = getInputError('form');

  return (
    <div>
      <h1>Get started absolutely free.</h1>
      <p>Enter your details below.</p>
      {formError && <p>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <Input name="firstName" label="First name" type="text" error={getInputError('firstName')} />
        <Input name="lastName" label="Last name" type="text" error={getInputError('lastName')} />
        <Input name="email" label="Email" type="email" error={getInputError('email')} />
        <Input name="password" label="Password" type="password" error={getInputError('password')} />
        <Input name="repeatPassword" label="Repeat password" type="password" error={getInputError('repeatPassword')} />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Immutable.Map),
};

SignUp.defaultProps = {
  error: Immutable.Map({}),
};

const mapStateToProps = state => ({
  error: state.getIn(['signUp', 'error']),
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(signUpSubmit(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
