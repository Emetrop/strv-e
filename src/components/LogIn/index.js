import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Input';
import messages from './errorMessages';
import { logInSubmit } from './actions';

class LogIn extends Component {
  getInputError(name) {
    const { error } = this.props;

    if (!error) return '';

    const fieldError = !error.errors ? false : error.errors.find(e => e.path === name);

    // Error with defined field
    if (fieldError) {
      const message = messages.find(m => m.id === fieldError.message && m.field === name);

      return message ? message.message : fieldError.message;
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
        <h1>Sign in to Eventio</h1>
        <p>Enter your details below.</p>
        {formError && <p>{formError}</p>}
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            email: e.target.email.value,
            password: e.target.password.value,
          });
        }}
        >
          <Input name="email" label="Email" type="email" error={this.getInputError('email')} />
          <Input name="password" label="Password" type="password" error={this.getInputError('password')} />
          <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

LogIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string,
        path: PropTypes.string,
      })),
  }),
};

LogIn.defaultProps = {
  error: {},
};

const mapStateToProps = state => ({
  error: state.logIn.error,
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(logInSubmit(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
