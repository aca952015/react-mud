'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const HelpFile = props => {
  // The first help file is an array of strings for styling purposes.
  // Thus, if the help file is a string, display it as a paragraph tag.
  // Otherwise, display it as an unordered list with list items.
  let texts = typeof(props.message.helpObj.text) === 'string' ? props.message.helpObj.text :
              props.message.helpObj.text.map((entry, i) => <li key={i}>{entry}</li>);
  return <div className="help-file">
    <h3>{props.message.helpObj.title}</h3>
    {typeof(props.message.helpObj.text) === 'string' ? <p>{texts}</p> : <ul>{texts}</ul>}
  </div>;
};

HelpFile.propTypes = {
  message: PropTypes.object
};
