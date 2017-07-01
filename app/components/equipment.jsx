'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Equipment = props => {
  const slots = {
    0: 'head',
    1: 'shoulders',
    2: 'chest',
    3: 'legs',
    4: 'feet'
  };

  const equips = props.equipment;
  const eq = Object.keys(equips).map((item, i) => {
    return <li key={i}>
      {`<${slots[i][0].toUpperCase()}${slots[i].slice(1)}>`} {equips[item] ? <span>{equips[item].short}</span> : <span>Nothing</span>}
    </li>;
  });
  return <div className="equipment">
    <h3>You are wearing:</h3>
    <ul>{eq}</ul>
  </div>;
};

Equipment.propTypes = {
  equipment: PropTypes.object
};
