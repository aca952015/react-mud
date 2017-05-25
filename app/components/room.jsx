'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Room = props => {
  const exits = props.exits.map((exit, i) => <li key={i}>{exit}</li>);
  return <div>
    <h3>{props.roomName}</h3>
    <p>{props.desc}</p>
    <ul>{exits}</ul>
  </div>;
};

Room.propTypes = {
  exits: PropTypes.array,
  roomName: PropTypes.string,
  desc: PropTypes.string
};
