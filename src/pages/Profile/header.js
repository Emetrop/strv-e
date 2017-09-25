import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ProfileHeader = ({
  firstName,
  lastName,
  email,
}) => (
  <div className="containerResponsive">
    <div className="profileHeader">
      <div className="profileHeader__content">
        <div className="profileHeader__circle">
          {firstName.substring(0, 1)}
          {lastName.substring(0, 1)}
        </div>
        <div className="profileHeader__name">
          {firstName} {lastName}
        </div>
        <div className="profileHeader__email">
          {email}
        </div>
      </div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileHeader;
