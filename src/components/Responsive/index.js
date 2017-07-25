/* eslint-disable react/prop-types */
import React from 'react';
import Responsive from 'react-responsive';

// Desktop, tablet and mobile setup
export const Desktop = ({ children }) =>
  <Responsive minWidth={1024}>{children}</Responsive>;
export const Tablet = ({ children }) =>
  <Responsive minWidth={640} maxWidth={1023}>{children}</Responsive>;
export const Mobile = ({ children }) =>
  <Responsive maxWidth={639}>{children}</Responsive>;

// Default (desktop, tablet) and mobile setup
export const Default = ({ children }) =>
  <Responsive minWidth={640}>{children}</Responsive>;

export const TabletDesktop = ({ children }) =>
  <Responsive minWidth={640}>{children}</Responsive>;

export const MobileTablet = ({ children }) =>
  <Responsive maxWidth={1023}>{children}</Responsive>;
