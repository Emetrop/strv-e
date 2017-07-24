import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ContentHeader = ({ contentLeft, contentRight, middlePosition }) => (
  <div className="containerResponsive">
    <div className={middlePosition ? 'contentHeader contentHeader--middle' : 'contentHeader'}>
      <span>
        {contentLeft}
      </span>
      <span>
        {contentRight}
      </span>
    </div>
  </div>
);

ContentHeader.propTypes = {
  contentLeft: PropTypes.element,
  contentRight: PropTypes.element,
  middlePosition: PropTypes.bool,
};

ContentHeader.defaultProps = {
  contentLeft: <span />,
  contentRight: <span />,
  middlePosition: false,
};

export default ContentHeader;
