'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import duplicatesProcessor from '../processors/duplicates-processor.js';

export const Containers = props => {
  const containerContents = duplicatesProcessor(props.message.containedItems, 'short');

  let contents = containerContents.map((item, i) => <li key={i}>{item}</li>);
  if (!contents.length) contents = <li>Nothing</li>;

  return <div className="containers">
    <h3>You look inside and see:</h3>
    <ul>{contents}</ul>
  </div>;
};

Containers.propTypes = {
  message: PropTypes.object
};
