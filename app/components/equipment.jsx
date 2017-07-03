'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Equipment = props => {
  const equips = props.equipment;
  const eq = Object.keys(equips).map((slot, i) => {
    return <li key={i}>
      {`<${slot[0].toUpperCase()}${slot.slice(1)}>`} {equips[slot] ? <span>{equips[slot].short}</span> : <span>Nothing</span>}
    </li>;
  });
  return <div className="equipment">
    <h3>{props.name ? `${props.name} is ` : 'You are '}wearing:</h3>
    <ul>{eq}</ul>
  </div>;
};

Equipment.propTypes = {
  equipment: PropTypes.object,
  name: PropTypes.string
};
