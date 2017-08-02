import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import ArrowDownIcon from '../../images/arrowDown';
import { Mobile, Default } from '../Responsive';
import { getEventFilterType } from '../../selectors';
import { filterEvents } from '../../actions';

export const eventListFilters = {
  ALL: 'ALL',
  PAST: 'PAST',
  FUTURE: 'FUTURE',
};

class EventListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
  }

  getCurrentFilterTitle() {
    const {
      currentFilter,
    } = this.props;

    if (currentFilter === eventListFilters.FUTURE) return 'Future Events';
    if (currentFilter === eventListFilters.PAST) return 'Past Events';
    return 'All Events';
  }

  getMobileFilterClasses(filter) {
    const {
      currentFilter,
    } = this.props;

    return classnames({
      listFilterMobile__menuItem: true,
      'listFilterMobile__menuItem--active': currentFilter === filter,
    });
  }

  getFilterClasses(filter) {
    const {
      currentFilter,
    } = this.props;

    return classnames({
      listFilter__menuItem: true,
      'listFilter__menuItem--active': currentFilter === filter,
    });
  }

  handleClickOutside() {
    this.setState({
      isMenuOpened: false,
    });
  }

  handleMenuSelect(filterType) {
    const {
      filterEvents,
    } = this.props;

    filterEvents(filterType);
    this.toggleMenu();
  }

  toggleMenu() {
    this.setState({
      isMenuOpened: !this.state.isMenuOpened,
    });
  }

  render() {
    const {
      filterEvents,
    } = this.props;

    return (
      <div className="listFilter__container">
        <Mobile>
          <span className="listFilterMobile__show">Show: </span>
          <span
            className="listFilterMobile__selected"
            role="presentation"
            onClick={() => this.toggleMenu()}
          >
            <span>{this.getCurrentFilterTitle()}</span>
            <ArrowDownIcon className="listFilterMobile__arrowDown" />
          </span>
          <ul className={this.state.isMenuOpened ?
            'listFilterMobile__menu listFilterMobile__menu--active' : 'listFilterMobile__menu'}
          >
            <li>
              <span
                role="switch"
                aria-checked="true"
                tabIndex={0}
                className={this.getMobileFilterClasses(eventListFilters.ALL)}
                onClick={() => this.handleMenuSelect(eventListFilters.ALL)}
              >All Events</span>
            </li>
            <li>
              <span
                role="switch"
                aria-checked="false"
                tabIndex={-1}
                className={this.getMobileFilterClasses(eventListFilters.FUTURE)}
                onClick={() => this.handleMenuSelect(eventListFilters.FUTURE)}
              >Future Events</span>
            </li>
            <li>
              <span
                role="switch"
                aria-checked="false"
                tabIndex={-2}
                className={this.getMobileFilterClasses(eventListFilters.PAST)}
                onClick={() => this.handleMenuSelect(eventListFilters.PAST)}
              >Past Events</span>
            </li>
          </ul>
        </Mobile>
        <Default>
          <ul className="listFilter__menu">
            <li
              onClick={() => filterEvents(eventListFilters.ALL)}
              className={this.getFilterClasses(eventListFilters.ALL)}
            >
              All Events
            </li>
            <li
              onClick={() => filterEvents(eventListFilters.FUTURE)}
              className={this.getFilterClasses(eventListFilters.FUTURE)}
            >
              Future Events
            </li>
            <li
              onClick={() => filterEvents(eventListFilters.PAST)}
              className={this.getFilterClasses(eventListFilters.PAST)}
            >
              Past Events
            </li>
          </ul>
        </Default>
      </div>
    );
  }
}

EventListFilter.propTypes = {
  filterEvents: PropTypes.func.isRequired,
  currentFilter: PropTypes.oneOf([
    eventListFilters.ALL,
    eventListFilters.FUTURE,
    eventListFilters.PAST,
  ]).isRequired,
};

const mapStateToProps = state => ({
  currentFilter: getEventFilterType(state),
});

const mapDispatchToProps = dispatch => ({
  filterEvents(filter) {
    dispatch(filterEvents(filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(EventListFilter));
