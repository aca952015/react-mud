'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Communication = props => {
  // If the user is whispering to themself, we do not need a comma and quotes.
  // If the user is a third party to a whisper, they do not need a comma and quotes.
  // If the message is a say and the user is saying, set theFrom to be 'You '.
  // Give quotes a variable because the editor highlights strangely otherwise.
  const selfWhisper = props.message.commType === ' whispers something quietly.';
  const thirdParty = props.message.commType === ' whispers something to ';

  let ghostCheck = props.message.from.split('The ghost of ')[1];
  if (ghostCheck) ghostCheck = ghostCheck.toLowerCase() === props.username.toLowerCase();

  const theFrom = props.message.from.toLowerCase() === props.username.toLowerCase() || ghostCheck ? 'You' : props.message.from;
  const quotes = '"';

  // If there's a target, show it. Use the above variables to decide on correct grammar.
  // If quotes are necessary, based on the above variables, insert them.
  return <p className="communication">
    <span className="source">{theFrom}</span>
    <span className="comm-type">{props.message.commType}</span>
    {props.message.target ? <span>
      <span className="source">{props.message.target}</span>
      {thirdParty ? <span className="comm-type">.</span> : <span className="comm-type">, </span>}
    </span> : null}
    {selfWhisper ? null : <span>
      <span className="comm-type">{thirdParty ? null : quotes}</span>
      <span>{props.message.text}</span>
      <span className="comm-type">{thirdParty ? null : quotes}</span>
    </span>}
  </p>;
};

Communication.propTypes = {
  message: PropTypes.object,
  username: PropTypes.string
};
