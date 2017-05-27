'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Feedback = props => {
  return <p className="feedback">
    {props.message.from ? <span>{props.message.from} </span> : null}{props.message.text}
  </p>;
};

Feedback.propTypes = {
  message: PropTypes.object
};
