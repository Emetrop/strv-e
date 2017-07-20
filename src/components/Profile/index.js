import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import EventList from '../EventList';
import { getProfileEvents } from '../../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends Component {
  render() {
    const { events } = this.props;

    return (
      <div>
        <EventList events={events} />
      </div>
    );
  }
}

Profile.propTypes = {
  events: PropTypes.instanceOf(Immutable.Map),
};

Profile.defaultProps = {
  events: Immutable.Map({}),
};

const mapStateToProps = state => ({
  events: getProfileEvents(state),
});

export default connect(mapStateToProps)(Profile);
