'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Room} from './room.jsx';
import {Occupants} from './occupants.jsx';
import {OnlineUsers} from './online-users.jsx';
import {Feedback} from './feedback.jsx';
import {Inventory} from './inventory.jsx';

export const Messages = props => {
  const messages = props.messages.map((message, index) => {
    return <li key={index}>
        {message.room ? <Room message={message}/> : null}
        {message.occupants ? <Occupants message={message}/> : null}
        {message.onlineUsers ? <OnlineUsers message={message}/> : null}
        {message.text ? <Feedback message={message}/> : null}
        {message.inventory ? <Inventory inventory={message.inventory}/> : null}
      </li>;
  });
  return <div className="messages">
    <ul>{messages}</ul>
  </div>;
};

Messages.propTypes = {
  messages: PropTypes.array
};
