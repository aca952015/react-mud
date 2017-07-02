'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Prompt = props => {
  return <div className="prompt">
    <p>HP: <span>{props.hp}</span><span> / </span><span>{props.maxHP}</span></p>
    <p>MP: <span>{props.mp}</span><span> / </span><span>{props.maxMP}</span></p>
  </div>;
};

Prompt.propTypes = {
  character: PropTypes.object,
  hp: PropTypes.string,
  mp: PropTypes.string,
  maxHP: PropTypes.string,
  maxMP: PropTypes.string
};
