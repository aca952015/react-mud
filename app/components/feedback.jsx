'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Feedback = props => {
  // If there's a target, check if it's you. If so, replace the name with "you".
  let target;
  if (props.message.target) {
    target = props.message.target.toLowerCase() === props.username.toLowerCase() ? 'you' : props.message.target;
  }

  // If the message has a from, highlight it in blue.
  // If the message has an interaction, display it.
  // If the message has a target, highlight it in blue, but not the period.
  // Show the feedback message.
  return <p className="feedback">
    {props.message.from && <span className="source">{props.message.from}</span>}
    {props.message.interaction && <span>{props.message.interaction}</span>}
    {target && <span><span className="source">{target}</span><span>.</span></span>}
    <span>{props.message.feedback}</span>
  </p>;
};

Feedback.propTypes = {
  message: PropTypes.object,
  username: PropTypes.string
};
