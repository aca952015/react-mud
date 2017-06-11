'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Communication = props => {

  let selfWhisper = props.message.commType === ' whispers something quietly.';
  let theFrom = props.message.from.toLowerCase() === props.username.toLowerCase() ? 'You' : props.message.from;

  return <p className="communication">
    <span className="source">{theFrom}</span>
    <span>{props.message.commType}</span>
    {props.message.target ? <span className="source">{props.message.target}</span> : null}
    {selfWhisper ? null : <span>
      <span>, "</span><span>{props.message.text}</span><span>"</span>
    </span>}
  </p>;
};

Communication.propTypes = {
  message: PropTypes.object,
  username: PropTypes.string
};
