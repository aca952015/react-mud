'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Room = props => {
  const exits = Object.keys(props.message.room.exits).map((exit, i) => <li key={i}>{exit}</li>);
  const items = props.message.room.items ? props.message.room.items.map((item, i) => <li key={i}>{item.long}</li>) : null;
  return <div className="room">
    <h3>{props.message.room.roomName}</h3>
    <p>{props.message.room.desc}</p>
    {items ? <ul>{items}</ul> : null}
    <ul>{exits}</ul>
  </div>;
};

Room.propTypes = {
  message: PropTypes.object
};
