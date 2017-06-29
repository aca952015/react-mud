'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import duplicatesProcessor from '../processors/duplicates-processor.js';

export const Room = props => {
  let room = props.message.room;
  let roomItemInfo = duplicatesProcessor(room.items, 'long');
  let items = roomItemInfo.map((item, i) => <li key={i}>{item}</li>);

  const exits = Object.keys(room.exits).map((exit, i) => <li key={i}>{room.exits[exit].locked ? '(' : null}{exit}{room.exits[exit].locked ? ')' : null}</li>);

  return <div className="room">
    <h3>{room.roomName}</h3>
    <p>{room.desc}</p>
    {items ? <ul className="items">{items}</ul> : null}
    <ul className="exits">Exits: [ {exits} ]</ul>
  </div>;
};

Room.propTypes = {
  message: PropTypes.object
};
