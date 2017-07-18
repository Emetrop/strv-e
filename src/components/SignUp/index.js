import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Input';
import messages from './errorMessages';
import { signUpSubmit } from '../../actions';

class SignUp extends Component {
  getInputError(name) {
    const { error } = this.props;

    if (!error) return '';

    // Error with defined field
    if (error.errors && error.errors[name]) {
      const message = messages.find(m => m.id === error.errors[name].message && m.field === name);

      return message ? message.message : error.errors[name].message;
    }

    // Error without defined field
    const generalError = messages.find(m => m.id === error.error && m.field === name);

    return generalError ? generalError.message : '';
  }

  render() {
    const { onSubmit } = this.props;

    const formError = this.getInputError('form');

    return (
      <div>
        <h1>Get started absolutely free.</h1>
        <p>Enter your details below.</p>
        {formError && <p>{formError}</p>}
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
          });
        }}
        >
          <Input name="firstName" label="First name" type="text" error={this.getInputError('firstName')} />
          <Input name="lastName" label="Last name" type="text" error={this.getInputError('lastName')} />
          <Input name="email" label="Email" type="email" error={this.getInputError('email')} />
          <Input name="password" label="Password" type="password" error={this.getInputError('password')} />
          <Input name="repeatPassword" label="Repeat password" type="password" error={this.getInputError('repeatPassword')} />
          <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
    errors: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

SignUp.defaultProps = {
  error: {},
};

const mapStateToProps = state => ({
  error: state.signUp.error,
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(signUpSubmit(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
