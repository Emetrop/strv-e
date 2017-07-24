import React from 'react';
import { Link } from 'react-router-dom';

const PageHeaderLogo = () => (
  <Link to="/dashboard" className="pageHeader__logoLink">
    <span className="pageHeader__logo" />
  </Link>
);

export default PageHeaderLogo;
