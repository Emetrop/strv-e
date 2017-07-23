import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import Input from '../Input';
import { logInSubmit, setFormErrors } from '../../actions';
import { getFormErrors } from '../../selectors';
import { getInputError } from '../../actions/utils';

const LogIn = ({ onSubmit, errors, setFormErrors }) => {
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = { message: 'Email has to be filled up' };
    }

    if (!values.password) {
      errors.password = { message: 'Password has to be filled up' };
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const errors = validate(values);

    if (Object.keys(errors).length > 0) setFormErrors('logIn', Immutable.fromJS(errors));
    else onSubmit(Immutable.fromJS(values));
  };

  const formError = getInputError(errors, 'form');

  return (
    <div>
      <h1>Sign in to Eventio</h1>
      <p>Enter your details below.</p>
      {formError && <p>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <Input name="email" label="Email" type="email" error={getInputError(errors, 'email')} />
        <Input name="password" label="Password" type="password" error={getInputError(errors, 'password')} />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

LogIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const mapStateToProps = state => ({
  errors: getFormErrors(state, 'logIn'),
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(logInSubmit(values));
  },
  setFormErrors(formName, errors) {
    dispatch(setFormErrors(formName, errors));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
