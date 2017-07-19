import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import Input from '../Input';
import messages from './errorMessages';
import { logInSubmit } from '../../actions';

class LogIn extends Component {
  getInputError(fieldName) {
    const { error } = this.props;

    if (!error) return '';

    const fieldError = !error.has('errors') ? false : error.get('errors').find(e => e.get('path') === fieldName);

    // Error with defined field
    if (fieldError) {
      const message = messages.find(m => m.id === fieldError.get('message') && m.field === fieldName);

      return message ? message.message : fieldError.get('message');
    }

    // Error without defined field
    const generalError = messages.find(m => m.id === error.get('error') && m.field === fieldName);

    return generalError ? generalError.message : '';
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSubmit } = this.props;

    onSubmit(Immutable.fromJS({
      email: event.target.email.value,
      password: event.target.password.value,
    }));
  }

  render() {
    const formError = this.getInputError('form');

    return (
      <div>
        <h1>Sign in to Eventio</h1>
        <p>Enter your details below.</p>
        {formError && <p>{formError}</p>}
        <form onSubmit={e => this.handleSubmit(e)}>
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
  error: PropTypes.instanceOf(Immutable.Map),
};

LogIn.defaultProps = {
  error: Immutable.Map({}),
};

const mapStateToProps = state => ({
  error: state.getIn(['logIn', 'error']),
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(logInSubmit(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
