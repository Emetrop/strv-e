import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Immutable from 'immutable';
import { logOut } from '../../actions';
import { getCurrentUser } from '../../selectors';

class PageHeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
  }

  toggleMenu() {
    this.setState({
      isMenuOpened: !this.state.isMenuOpened,
    });
  }

  render() {
    const { user, logOut } = this.props;

    return (
      <div>
        <span>
          {user.get('firstName').substring(0, 1)}
          {user.get('lastName').substring(0, 1)}
        </span>
        <span>
          {user.get('firstName')} {user.get('lastName')}
        </span>
        <span role="presentation" onClick={() => this.toggleMenu()}>Menu</span>
        <ul className={this.state.isMenuOpened ? 'active' : ''} >
          <li>
            <Link to="/profile" >
              Profile
            </Link>
          </li>
          <li>
            <Link to="#" onClick={logOut} >
              Log out
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

PageHeaderMenu.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  logOut() {
    dispatch(logOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeaderMenu);
