'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Room = props => {
  let counts = {};
  let room = props.message.room;
  const exits = Object.keys(room.exits).map((exit, i) => <li key={i}>{room.exits[exit].locked ? '(' : null}{exit}{room.exits[exit].locked ? ')' : null}</li>);

  room.items.forEach(item => counts[item.name] = (counts[item.name] || 0) + 1);
  let roomItemInfo = room.items.map(item => {
    let itemString = '';
    if (counts[item.name] > 1) itemString += `(${counts[item.name]}) `;
    itemString += item.long;
    return itemString;
  }).reduce((acc, ele) => {
    if (!acc.includes(ele)) acc.push(ele);
    return acc;
  }, []);

  let items = roomItemInfo.map((item, i) => <li key={i}>{item}</li>);

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
