import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { logInSubmit, setFormErrors } from '../../actions';
import { getFormErrors } from '../../selectors';
import { getInputError } from '../../actions/utils';
import Button, { buttonColorTypes, buttonSizeTypes, buttonTypes } from '../../components/Button';
import { Mobile, MobileTablet, Desktop, Default } from '../../components/Responsive';
import PublicPage from '../../components/PublicPage';
import PageHeader, { PageHeaderLogo, pageHeaderLogoStyles } from '../../components/PageHeader';
import './styles.css';

const LogIn = ({
  onSubmit,
  errors,
  setFormErrors,
}) => {
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
      <PageHeader
        contentLeft={
          <span className="logIn__logo">
            <MobileTablet><PageHeaderLogo link="/login" style={pageHeaderLogoStyles.DARK} /></MobileTablet>
            <Desktop><PageHeaderLogo link="/login" style={pageHeaderLogoStyles.LIGHT} /></Desktop>
          </span>
        }
        contentRight={
          <span>
            <Default>
              <div className="logIn__linkContainer logIn__linkContainer--header">
                <span className="logIn__linkText">Don’t have account? </span>
                <Link to="/signup" className="logIn__link">Sign Up</Link>
              </div>
            </Default>
          </span>
        }
      />
      <PublicPage>
        <div className="logIn__content">
          <h1 className="logIn__title">Sign in to Eventio</h1>
          <p className="logIn__hint">Enter your details below.</p>
          {formError && <p className="logIn__error">{formError}</p>}
          <form onSubmit={handleSubmit}>
            <Input name="email" label="Email" type="text" error={getInputError(errors, 'email')} />
            <Input name="password" label="Password" type="password" error={getInputError(errors, 'password')} />
            <Mobile>
              <div className="logIn__linkContainer">
                <span className="logIn__linkText">Don’t have account? </span>
                <Link to="/signup" className="logIn__link">Sign Up</Link>
              </div>
            </Mobile>
            <div className="logIn__button">
              <Button
                type={buttonTypes.SUBMIT}
                size={buttonSizeTypes.LARGE}
                color={buttonColorTypes.GREEN}
              >Sign in</Button>
            </div>
          </form>
        </div>
      </PublicPage>
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
