import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonLink = ({ children, url }) => (
  <Link to={url}>
    {children}
  </Link>
);

ButtonLink.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ButtonLink;
