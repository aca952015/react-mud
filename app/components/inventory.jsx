'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Inventory = props => {
  let counts = {};
  props.inventory.forEach(item => counts[item] = (counts[item] || 0) + 1);
  let inventoryInfo = props.inventory.map(item => {
    let invString = '';
    if (counts[item] > 1) invString += `(${counts[item]}) `;
    invString += item.short;
    return invString;
  }).reduce((acc, ele) => {
    if (!acc.includes(ele)) acc.push(ele);
    return acc;
  }, []);
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
