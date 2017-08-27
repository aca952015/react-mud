'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import duplicatesProcessor from '../processors/duplicates-processor.js';

export const Room = props => {
  const room = props.message.room;
  const roomItemInfo = duplicatesProcessor(room.items, 'long');
  const items = roomItemInfo.map((item, i) => <li key={i}>{item}</li>);

  // If an exit is locked, display it with parentheses around it. Otherwise, display the exit plainly.
  const exits = Object.keys(room.exits).map((exit, i) => <li key={i}>{room.exits[exit].locked && '('}{exit}{room.exits[exit].locked && ')'}</li>);

  return <div className="room">
    <h3>{room.roomName}</h3>
    <p>{room.desc}</p>
    {items.length >  0 && <ul className="items">{items}</ul>}
    <ul className="exits">Exits: [ {exits} ]</ul>
  </div>;
};

Room.propTypes = {
  message: PropTypes.object
};
