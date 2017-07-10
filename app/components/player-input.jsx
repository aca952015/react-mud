'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const PlayerInput = props => {
  if (props.currentRoom === 'Login Room') return;
  return <div className="player-input">
    <p>{props.message.playerInput}</p>
  </div>;
};

PlayerInput.propTypes = {
  message: PropTypes.object,
  currentRoom: PropTypes.string
};
