import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const pageHeaderLogoStyles = {
  DARK: 'dark',
  LIGHT: 'light',
};

const PageHeaderLogo = ({ style, link }) => (
  <Link
    to={link}
    className={
          style === pageHeaderLogoStyles.DARK ?
            'pageHeader__logo--dark pageHeader__logoLink' : 'pageHeader__logo--light pageHeader__logoLink'
        }
  >
    <span className="pageHeader__logo" />
  </Link>
);

PageHeaderLogo.propTypes = {
  style: PropTypes.oneOf([
    pageHeaderLogoStyles.DARK,
    pageHeaderLogoStyles.LIGHT,
  ]),
  link: PropTypes.string.isRequired,
};

PageHeaderLogo.defaultProps = {
  style: pageHeaderLogoStyles.DARK,
};

export default PageHeaderLogo;
