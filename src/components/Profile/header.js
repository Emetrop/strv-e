import React from 'react';
import PropTypes from 'prop-types';

const ProfileHeader = ({ firstName, lastName, email }) => (
  <div>
    <div>
      {firstName.substring(0, 1)}
      {lastName.substring(0, 1)}
    </div>
    <div>
      {firstName} {lastName}
    </div>
    <div>
      {email}
    </div>
  </div>
);

ProfileHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileHeader;
