import React from 'react';
import PropTypes from 'prop-types';
import EventListFilter from './filter';
import EventListViewToggle from './viewToggle';

const ContentHeader = ({ contentLeft, contentRight }) => (
  <div>
    <span>
      {contentLeft}
    </span>
    <span>
      {contentRight}
    </span>
  </div>
);

ContentHeader.propTypes = {
  contentLeft: PropTypes.element,
  contentRight: PropTypes.element,
};

ContentHeader.defaultProps = {
  contentLeft: <span />,
  contentRight: <span />,
};

export default ContentHeader;

export {
  EventListFilter,
  EventListViewToggle,
};
