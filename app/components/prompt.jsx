'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Prompt = props => {
  // Show currentHP / maxHP and currentMP / maxMP
  return <div className="prompt">
    <p>HP: <span>{props.hp}</span><span> / </span><span>{props.maxHP}</span></p>
    <p>MP: <span>{props.mp}</span><span> / </span><span>{props.maxMP}</span></p>
  </div>;
};

Prompt.propTypes = {
  character: PropTypes.object,
  hp: PropTypes.number,
  mp: PropTypes.number,
  maxHP: PropTypes.number,
  maxMP: PropTypes.number
};
