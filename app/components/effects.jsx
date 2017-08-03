'use strict';

import React from 'react';
import PropTypes from 'prop-types';

/*

  Effect            |            Affects
  Infusion          |      Atk:    +3
                    |      Mat:    +3
  --------------------------------------
  HP Buff           |      MaxHP:  +25
*/
export const Effects = props => {
  const effectBlocks = Object.keys(props.effects).map((effectName, i) => {
    const allEffects = Object.keys(props.effects[effectName]).map((effectStat, j) => {
      return <li key={j}>
        <span>{effectStat}: </span>
        <span>{props.effects[effectName][effectStat] > 0 ? '+' : '-'}{props.effects[effectName][effectStat]}</span>
      </li>;
    });

    return <div key={i} className="effect-block">
      <p>{effectName}</p>
      <ul>{allEffects}</ul>
    </div>;
  });
  /*
  {
    atk: 3,
    mat: 3
  }
  */

  return <div className="effects">
    <p className="header">Effect</p>
    <p className="header">Affects</p>
    <ul>{effectBlocks}</ul>
  </div>;
};

Effects.propTypes = {
  effects: PropTypes.object
};
