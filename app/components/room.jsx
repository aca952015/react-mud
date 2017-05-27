'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Room = props => {
  const exits = Object.keys(props.message.exits).map((exit, i) => <li key={i}>{exit}</li>);
  return <div className="room">
    <h3>{props.message.roomName}</h3>
    <p>{props.message.desc}</p>
    <ul>{exits}</ul>
  </div>;
};

Room.propTypes = {
  message: PropTypes.object
};
