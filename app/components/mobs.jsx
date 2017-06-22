'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Mobs = props => {
  const mobs = props.message.mobs.map((mob, i) => <li key={i}>{mob.long}</li>);
  return <div className="mobs">
    <ul>{mobs}</ul>
  </div>;
};

Mobs.propTypes = {
  message: PropTypes.object
};
