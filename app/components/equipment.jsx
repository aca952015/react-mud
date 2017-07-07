'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Equipment = props => {
  const equips = props.equipment;

  // Slots is all the possible equipment slots and gets displayed as its own UL on the left side.
  // Items is all the equipment currently equipped in those slots, displayed to the right with
  // proper alignment.
  const slots = Object.keys(equips).map((slot, i) => <li key={i}>{`<${slot[0].toUpperCase()}${slot.slice(1)}>`}</li>);
  const items = Object.keys(equips).map((slot, i) => <li key={i}>{equips[slot] ? equips[slot].short : 'Nothing'}</li>);
  return <div className="equipment">
    <h3>{props.name ? `${props.name} is ` : 'You are '}wearing:</h3>
    <ul>{slots}</ul>
    <ul>{items}</ul>
    <div className="clearfix" style={{clear: 'both'}}></div>
  </div>;
};

Equipment.propTypes = {
  equipment: PropTypes.object,
  name: PropTypes.string
};
