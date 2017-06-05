'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Feedback = props => {
  // TODO: Better colors for player names and conversation.
  return <p className="feedback">
    {props.message.from ? <span className="source">{props.message.from} <span>{props.message.commType}</span></span> : null}{props.message.text}
  </p>;
};

Feedback.propTypes = {
  message: PropTypes.object
};
