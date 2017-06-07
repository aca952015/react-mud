'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Prompt = props => {
  return <div className="prompt">
    <p>HP: <span>{props.character.hp}</span><span> / </span><span>{props.character.maxHP}</span></p>
    <p>MP: <span>{props.character.mp}</span><span> / </span><span>{props.character.maxHP}</span></p>
  </div>;
};

Prompt.propTypes = {
  character: PropTypes.object
};
