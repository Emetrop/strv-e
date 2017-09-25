import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/index';
import Profile from '../Profile/index';
import EventDetail from '../EventDetail/index';
import EventNew from '../EventNew/index';
import EventEdit from '../EventEdit/index';
import LogIn from '../LogIn/index';
import SignUp from '../SignUp/index';
import { isLoggedIn } from '../../selectors';

const Routes = ({
  isLoggedIn,
}) => (
    isLoggedIn
      ?
        <div className="page page--nonPublic">
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
        <div className="page page--public">
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
  isLoggedIn: isLoggedIn(state),
});

export default withRouter(connect(mapStateToProps)(Routes));
