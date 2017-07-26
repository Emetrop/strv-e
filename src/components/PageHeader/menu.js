import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Immutable from 'immutable';
import onClickOutside from 'react-onclickoutside';
import { logOut } from '../../actions';
import { getCurrentUser } from '../../selectors';
import { Default } from '../Responsive';

class PageHeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
  }

  handleClickOutside() {
    this.setState({
      isMenuOpened: false,
    });
  }

  toggleMenu() {
    this.setState({
      isMenuOpened: !this.state.isMenuOpened,
    });
  }

  render() {
    const { user, logOut } = this.props;

    return (
      <div className="pageHeader__menuContainer">
        <span className="pageHeader__circle">
          {user.get('firstName').substring(0, 1)}
          {user.get('lastName').substring(0, 1)}
        </span>
        <Default>
          <span className="pageHeader__name">
            {user.get('firstName')} {user.get('lastName')}
          </span>
        </Default>
        <span role="presentation" className="pageHeader__arrowDown" onClick={() => this.toggleMenu()} />
        <ul className={this.state.isMenuOpened ? 'pageHeader__menu pageHeader__menu--active' : 'pageHeader__menu'} >
          <li className="pageHeader__menuItem">
            <Link to="/profile" className="pageHeader__menuLink">
              Profile
            </Link>
          </li>
          <li className="pageHeader__menuItem">
            <Link to="#" onClick={logOut} className="pageHeader__menuLink">
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

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(PageHeaderMenu));
