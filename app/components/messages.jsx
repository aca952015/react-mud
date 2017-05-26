'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Messages = props => {
  const messages = props.messages.map((message, index) => {
    const exits = message.exits ? Object.keys(message.exits).map((exit, i) => <li key={i}>{exit}</li>) : null;
    const playerOccupants = message.occupants ? message.occupants.map((player, i) => <li key={i}>{player} is here.</li>) : null;
    return <li key={index}>
      {message.roomName ?
        <div className="room">
          <h3>{message.roomName}</h3>
          <p>{message.desc}</p>
          <ul>{exits}</ul>
        </div> : null}
        {message.occupants ? <div className="player-occupants">
          <ul>{playerOccupants}</ul>
        </div> : null}
        {message.text ?
          <p className="feedback">
            {message.from ? <span>{message.from} </span> : null}{message.text}
          </p> : null}
        </li>;
  });
  return <div>
    <ul>{messages}</ul>
  </div>;
};

Messages.propTypes = {
  messages: PropTypes.array
};
