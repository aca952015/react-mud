'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Prompt = props => {
  return <div className="prompt">
    <span>{props.character.hp}</span>
    <span>{props.character.mp}</span>
  </div>;
};

Prompt.propTypes = {
  character: PropTypes.object
};
