import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoIcon from '../../images/logo';

export const pageHeaderLogoStyles = {
  DARK: 'dark',
  LIGHT: 'light',
};

const PageHeaderLogo = ({ style, link }) => (
  <Link
    to={link}
    className="pageHeader__logoLink"
  >
    <LogoIcon className={
        style === pageHeaderLogoStyles.DARK ?
          'pageHeader__logo--dark pageHeader__logo' : 'pageHeader__logo--light pageHeader__logo'
      }
    />
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
