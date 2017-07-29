import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { Link } from 'react-router-dom';
import Input from '../Input';
import { signUpSubmit, setFormErrors } from '../../actions';
import Button, { buttonTypes, buttonColorTypes, buttonSizeTypes } from '../Button';
import { getFormErrors } from '../../selectors';
import { getInputError } from '../../actions/utils';
import { Mobile, MobileTablet, Desktop, Default } from '../Responsive';
import PublicPage from '../PublicPage';
import PageHeader, { PageHeaderLogo, pageHeaderLogoStyles } from '../PageHeader';
import './styles.css';

const SignUp = ({
  onSubmit,
  errors,
  setFormErrors,
}) => {
  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = { message: 'Firstname has to be filled up' };
    }

    if (!values.lastName) {
      errors.lastName = { message: 'Lastname has to be filled up' };
    }

    if (!values.email) {
      errors.email = { message: 'Email has to be filled up' };
    }

    if (!values.password) {
      errors.password = { message: 'Password has to be filled up' };
    } else if (values.password !== values.repeatPassword) {
      errors.repeatPassword = { message: 'Passwords have to be same' };
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      repeatPassword: event.target.repeatPassword.value,
    };

    const errors = validate(values);

    if (Object.keys(errors).length > 0) setFormErrors('signUp', Immutable.fromJS(errors));
    else onSubmit(Immutable.fromJS(values));
  };

  const formError = getInputError(errors, 'form');

  return (
    <div>
      <PageHeader
        contentLeft={
          <span className="signUp__logo">
            <MobileTablet><PageHeaderLogo link="/login" style={pageHeaderLogoStyles.DARK} /></MobileTablet>
            <Desktop><PageHeaderLogo link="/login" style={pageHeaderLogoStyles.LIGHT} /></Desktop>
          </span>
        }
        contentRight={
          <span>
            <Default>
              <div className="signUp__linkContainer signUp__linkContainer--header">
                <span className="signUp__linkText">Already have an account? </span>
                <Link to="/login" className="signUp__link">Sign In</Link>
              </div>
            </Default>
          </span>
        }
      />
      <PublicPage>
        <div className="signUp__content">
          <h1 className="signUp__title">Get started absolutely free.</h1>
          <p className="signUp__hint">Enter your details below.</p>
          {formError && <p className="signUp__error">{formError}</p>}
          <form onSubmit={handleSubmit}>
            <Input name="firstName" label="First name" type="text" error={getInputError(errors, 'firstName')} />
            <Input name="lastName" label="Last name" type="text" error={getInputError(errors, 'lastName')} />
            <Input name="email" label="Email" type="email" error={getInputError(errors, 'email')} />
            <Input name="password" label="Password" type="password" error={getInputError(errors, 'password')} />
            <Input name="repeatPassword" label="Repeat password" type="password" error={getInputError(errors, 'repeatPassword')} />
            <Mobile>
              <div className="signUp__linkContainer">
                <span className="signUp__linkText">Already have an account? </span>
                <Link to="/login" className="signUp__link">Sign In</Link>
              </div>
            </Mobile>
            <div className="signUp__button">
              <Button
                type={buttonTypes.SUBMIT}
                size={buttonSizeTypes.LARGE}
                color={buttonColorTypes.GREEN}
              >Sign Up</Button>
            </div>
          </form>
        </div>
      </PublicPage>
    </div>
  );
};

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const mapStateToProps = state => ({
  errors: getFormErrors(state, 'signUp'),
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(signUpSubmit(values));
  },
  setFormErrors(formName, errors) {
    dispatch(setFormErrors(formName, errors));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
