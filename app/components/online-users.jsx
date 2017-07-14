'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const OnlineUsers = props => {
  const onlineUsers = props.message.onlineUsers.map((user, i) => <li key={i}>{user}</li>);
  return <div className="who-list">
    <h3>Users online</h3>
    <p>--------------</p>
    <ul>{onlineUsers}</ul>
  </div>;
};

OnlineUsers.propTypes = {
  message: PropTypes.object
};
