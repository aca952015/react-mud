'use strict';

import React from 'react';
import PropTypes from 'prop-types';

/*
  This component has a bit of a complicated conditional structure, but allows the handling of
  colorization and proper grammar formatting for all player feedback.
  If the text field has a single space, then it means there basically isn't a text field. However,
  this component is only rendered if a text field exists, so a single space is effectively a
  placeholder value that will trigger the rendering of this component when from, commType, and/or
  target are still necessary (e.g., "So-and-so whispers to themself" or "So-and-so whispers to
  so-and-so.").
  First, the logic checks if the message has a from field, that the text is not a single space,
  and that the text has quotes in it. If so, it is a say or whisper feedback, which will format
  in a particular manner, stripping out the quotes and replacing them with spans in the JSX so
  as to avoid injecting HTML into strings directly.
  The actual JSX checks if there is a from - if so, it means a player is doing some action, so
  the name needs to be highlighted in the correct color.
  If there is a commType, then it means there's something like, "says,", "whispers to you," etc.
  If there is a target, then it means there is a player name again, so it needs to be highlighted,
  similarly to if there is a from.
  If the text is not an empty space, then there needs to be a comma - if there isn't actual text,
  then there needs to be a period.
  Finally, the text field is displayed, with quotes added and properly colorized in spans if quotes
  are expected.
*/
export const Feedback = props => {
  let quotes = false;
  if (props.message.from && props.message.text !== ' ' && props.message.text.indexOf('"') !== -1) {
    props.message.text = props.message.text.replace(/"/g, '');
    quotes = true;
  }
  return <p className="feedback">
    {props.message.from ? <span className="source">{props.message.from}
      {props.message.commType ? <span>{props.message.commType}</span> : null}
    </span> : null}
    {props.message.target ? <span className="source">{props.message.target}
      {props.message.text && props.message.text !== ' ' ? <span>, </span> : <span>.</span>}
    </span> : null}
    {quotes ? <span style={{color: '#0E8250'}}>"</span> : null}{props.message.text}{quotes ? <span style={{color: '#0E8250'}}>"</span> : null}
  </p>;
};

Feedback.propTypes = {
  message: PropTypes.object
};
