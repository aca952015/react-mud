'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Containers = props => {
  let counts = {};
  props.message.containedItems.forEach(item => counts[item.name] = (counts[item.name] || 0) + 1);

  let containerContents = props.message.containedItems.map(item => {
    let invString = '';
    if (counts[item.name] > 1) invString += `(${counts[item.name]}) `;
    invString += item.short;
    return invString;
  }).reduce((acc, ele) => {
    if (!acc.includes(ele)) acc.push(ele);
    return acc;
  }, []);

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
