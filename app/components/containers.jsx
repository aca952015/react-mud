'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Containers = props => {
  let items = props.message.containedItems.map((item, i) => <li key={i}>{item.short}</li>);
  if (!items.length) items = <li>Nothing</li>;

  return <div className="containers">
    <h3>You look inside and see:</h3>
    <ul>{items}</ul>
  </div>;
};

Containers.propTypes = {
  message: PropTypes.object
};
