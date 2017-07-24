import React from 'react';
import PropTypes from 'prop-types';
import PageHeaderLogo from './logo';
import PageHeaderMenu from './menu';
import './styles.css';

const PageHeader = ({ contentLeft, contentMiddle, contentRight }) => (
  <div className="pageHeader__container">
    <span className="pageHeader__item">
      {contentLeft}
    </span>
    <span className="pageHeader__item">
      {contentMiddle}
    </span>
    <span className="pageHeader__item">
      {contentRight}
    </span>
  </div>
);

PageHeader.propTypes = {
  contentLeft: PropTypes.element,
  contentMiddle: PropTypes.element,
  contentRight: PropTypes.element,
};

PageHeader.defaultProps = {
  contentLeft: <PageHeaderLogo />,
  contentMiddle: <span />,
  contentRight: <span />,
};

export default PageHeader;

export {
  PageHeaderLogo,
  PageHeaderMenu,
};
