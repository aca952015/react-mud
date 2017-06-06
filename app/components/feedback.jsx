'use strict';

import React from 'react';
import PropTypes from 'prop-types';

/*
  If the message has a from field, it is either a say or a whisper. If the text field is a single space,
  then the text field was set in the whisper processor to be a placeholder value indicating that
  it's a whisper between two third parties, not involving the client.
  If it's a say or a whisper involving the client, then the quotes are stripped from the text field and
  re-inserted in spans for proper colorization, instead of injecting HTML into the strings.
  commType is how the message is delivered - e.g., "says,", "whispers to you," "whisper to," etc.
  Effectively, these series of conditionals check what kind of message is delivered and format it
  appropriately, instead of creating several different components.
*/
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
