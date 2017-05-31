'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Inventory = props => {
  let inventory = props.inventory.map((item, i) => <li key={i}>{item.short}</li>);
  if (!inventory.length) inventory = <li>Nothing</li>;

  return <div className="inventory">
    <h3>You are carrying:</h3>
    <ul>{inventory}</ul>
  </div>;
};

Inventory.propTypes = {
  inventory: PropTypes.array
};
