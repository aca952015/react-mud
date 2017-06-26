'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const CombatLog = props => {
  const combatLog = props.message.combatLog;
  return <div className="combat-log">
    <p>
      <span className="from">{combatLog.from}</span>
      {combatLog.interaction ? <span>{combatLog.interaction}</span> : null}
      {combatLog.damage ?
        <span>
          <span>{combatLog.pre}</span>
          <span className="damage">{combatLog.damage}</span>
          <span>{combatLog.post}</span>
        </span>
      : null}
      <span className="target">{combatLog.target}</span>
      <span>{combatLog.punctuation}</span>
    </p>
  </div>;
};

CombatLog.propTypes = {
  message: PropTypes.object
};
