'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Feedback = props => {
  let quotes = false;
  if (props.message.from && props.message.text !== ' ') {
    props.message.text = props.message.text.replace(/"/g, '');
    quotes = true;
  }
  return <p className="feedback">
    {props.message.from ? <span className="source">{props.message.from} <span>{props.message.commType}</span></span> : null}
    {props.message.target ? <span className="source">{props.message.target}
    {props.message.text && props.message.text !== ' ' ? <span>, </span> : <span>.</span>}</span> : null}
    {quotes ? <span style={{color: '#0E8250'}}>"</span> : null}{props.message.text}{quotes ? <span style={{color: '#0E8250'}}>"</span> : null}
  </p>;
};

Feedback.propTypes = {
  message: PropTypes.object
};
