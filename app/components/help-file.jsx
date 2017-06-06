'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const HelpFile = props => {
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
