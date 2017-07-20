import React from 'react';
import PropTypes from 'prop-types';
import PageHeaderLogo from './logo';
import PageHeaderMenu from './menu';

const PageHeader = ({ contentLeft, contentMiddle, contentRight }) => (
  <div>
    <span>
      {contentLeft}
    </span>
    <span>
      {contentMiddle}
    </span>
    <span>
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
