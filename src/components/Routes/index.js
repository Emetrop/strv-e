import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import LogIn from '../LogIn';
import SignUp from '../SignUp';
import Dashboard from '../Dashboard';
import EventDetail from '../EventDetail';

const Routes = ({ isLoggedIn }) => (
    isLoggedIn
      ?
        <div>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/event/:id" exact component={EventDetail} />
            <Redirect to="/dashboard" />
          </Switch>
        </div>
      :
        <div>
          <Switch>
            <Route path="/login" exact component={LogIn} />
            <Route path="/signup" exact component={SignUp} />
            <Redirect to="/login" />
          </Switch>
        </div>
  );

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.logIn.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Routes));
