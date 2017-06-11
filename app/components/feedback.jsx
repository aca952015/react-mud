'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Feedback = props => {
  // If there's a target, check if it's you. If so, replace the name with "you".
  let target = props.message.target ?
               props.message.target.toLowerCase() === props.username.toLowerCase() ? 'you' : props.message.target
               : null;
  return <p className="feedback">
    {props.message.from ? <span className="source">{props.message.from}</span> : null}
    {props.message.lookType ? <span>{props.message.lookType}</span> : null}
    {target ? <span><span className="source">{target}</span><span>.</span></span> : null}
    <span>{props.message.feedback}</span>
  </p>;
};

Feedback.propTypes = {
  message: PropTypes.object,
  username: PropTypes.string
};
