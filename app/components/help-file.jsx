'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const HelpFile = props => {
  return <div className="help-file">
    <h3>{props.helpObj.title}</h3>
    <p>{props.helpObj.text}</p>
  </div>;
};

HelpFile.propTypes = {
  helpObj: PropTypes.object
};
