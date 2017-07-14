'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Occupants = props => {
  const playerOccupants = props.message.occupants.map((player, i) => <li key={i}><span>{player}</span> is here.</li>);
  return <div className="player-occupants">
    <ul>{playerOccupants}</ul>
  </div>;
};

Occupants.propTypes = {
  message: PropTypes.object
};
