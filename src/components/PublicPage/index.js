import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const PublicPage = ({ children }) => (
  <div className="publicPage__container">
    <div className="publicPage__leftSide">
      <div className="publicPage__imageWrap">
        <div className="publicPage__cite">
          <h2 className="publicPage__text">“Great, kid. Don’t get cocky.”</h2>
          <span className="publicPage__separator" />
          <p className="publicPage__author">Han Solo</p>
        </div>
      </div>
    </div>
    <div className="publicPage__rightSide">
      {children}
    </div>
  </div>
);

PublicPage.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PublicPage;
