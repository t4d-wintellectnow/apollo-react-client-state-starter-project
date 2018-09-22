import React from 'react';
import PropTypes from 'prop-types';

import './ToolHeader.css';

export const ToolHeader = ({ headerText }) =>
  <header className='toolHeader'>
    <h1>{headerText}</h1>
  </header>;

ToolHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
};
