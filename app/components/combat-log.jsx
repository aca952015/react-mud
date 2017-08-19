'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const CombatLog = props => {
  const combatLog = props.message.combatLog;
  const friendlyTarget = combatLog.target.friendly;
  if (friendlyTarget  && friendlyTarget.toLowerCase() === props.username.toLowerCase()) combatLog.target.friendly = 'you';
  const damageHighlightClass = combatLog.target.friendly && combatLog.from.friendly ? 'healing' : 'damage';

  return <div className="combat-log">
    <p>
      {/* The from, pre, interaction, damage, post, and target fields, using friendly and enemy,
        are all used to help decide how to style the combat log, mostly in terms of color.*/}
      <span className={combatLog.from.friendly ? 'from-friendly' : 'from-enemy'}>{combatLog.from.friendly ? combatLog.from.friendly : combatLog.from.enemy}</span>
      {combatLog.interaction && <span>{combatLog.interaction}</span>}
      {combatLog.damage &&
        <span>
          <span>{combatLog.pre}</span>
          <span className={damageHighlightClass}>{Math.abs(combatLog.damage)}</span>
          <span>{combatLog.post}</span>
        </span>}
      <span className={combatLog.target.friendly ? 'target-friendly' : 'target-enemy'}>{combatLog.target.friendly ? combatLog.target.friendly : combatLog.target.enemy}</span>
      <span>{combatLog.punctuation}</span>
    </p>
  </div>;
};

CombatLog.propTypes = {
  message: PropTypes.object,
  username: PropTypes.string
};
