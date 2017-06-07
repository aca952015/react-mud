'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Prompt = props => {
  return <div className="prompt">
    <span>HP: <span>{props.character.hp}</span></span>
    <span>MP: <span>{props.character.mp}</span></span>
  </div>;
};

Prompt.propTypes = {
  character: PropTypes.object
};
