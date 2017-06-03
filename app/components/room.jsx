'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Room = props => {
  let counts = {};
  let room = props.message.room;
  const exits = Object.keys(room.exits).map((exit, i) => <li key={i}>{room.exits[exit].locked ? '(' : null}{exit}{room.exits[exit].locked ? ')' : null}</li>);

  // Create an object that has the counts for each item in the room.items array.
  // For example: If counts['key'] does not exist, counts['key'] is equal to 0 + 1,
  // indicating there is 1 key in the room. If counts['key'] does exist, then the value
  // of counts['key'] becomes the current value + 1.
  room.items.forEach(item => counts[item.name] = (counts[item.name] || 0) + 1);

  // Create an array of item descriptions. If there is more than one item in the room,
  // referenced by checking our counts object, then prepend the string with parentheses
  // and the number of items. If not, just show the item description. Then remove
  // duplicate values using reduce.
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
