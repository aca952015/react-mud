'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const CombatLog = props => {
  const combatLog = props.message.combatLog;
  return <div className="combat-log">
    <p>
      <span className="from">{combatLog.from}</span>
      <span>{combatLog.interaction}</span>
      <span className="target">{combatLog.target}</span>
    </p>
  </div>;
};

CombatLog.propTypes = {
  message: PropTypes.object
};
