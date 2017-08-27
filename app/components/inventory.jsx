'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import duplicatesProcessor from '../processors/duplicates-processor.js';

export const Inventory = props => {
  const inventoryInfo = duplicatesProcessor(props.inventory, 'short');

  let inventory = inventoryInfo.map((item, i) => <li key={i}>{item}</li>);
  if (!inventory.length) inventory = <li>Nothing</li>;

  return <div className="inventory">
    <h3>You are carrying:</h3>
    <ul>{inventory}</ul>
  </div>;
};

Inventory.propTypes = {
  inventory: PropTypes.array
};
