import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Profile from '../Profile';
import EventDetail from '../EventDetail';
import EventNew from '../EventNew';
import EventEdit from '../EventEdit';
import LogIn from '../LogIn';
import SignUp from '../SignUp';

const Routes = ({ isLoggedIn }) => (
    isLoggedIn
      ?
        <div>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/event/new" exact component={EventNew} />
            <Route path="/event/:id" exact component={EventDetail} />
            <Route path="/event/:id/edit" exact component={EventEdit} />
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
  isLoggedIn: state.getIn(['logIn', 'isLoggedIn']),
});

export default withRouter(connect(mapStateToProps)(Routes));
