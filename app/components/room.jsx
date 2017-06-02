'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Room = props => {
  let room = props.message.room;
  console.log(room);
  const exits = Object.keys(room.exits).map((exit, i) => <li key={i}>{room.exits[exit].locked ? '(' : null}{exit}{room.exits[exit].locked ? ')' : null}</li>);
  const items = room.items ? room.items.map((item, i) => <li key={i}>{item.long}</li>) : null;
  return <div className="room">
    <h3>{room.roomName}</h3>
    <p>{room.desc}</p>
    {items ? <ul>{items}</ul> : null}
    <ul>{exits}</ul>
  </div>;
};

Room.propTypes = {
  message: PropTypes.object
};
