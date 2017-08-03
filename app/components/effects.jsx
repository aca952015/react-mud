'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Effects = props => {
  const effectBlocks = Object.keys(props.effects).map((effectName, i) => {
    const allEffects = Object.keys(props.effects[effectName]).map((effectStat, j) => {
      return <li key={j}>
        <span>{`${effectStat[0].toUpperCase()}${effectStat.slice(1)}`}: </span>
        <span>{props.effects[effectName][effectStat] > 0 ? '+' : '-'}{props.effects[effectName][effectStat]}</span>
      </li>;
    });

    return <div key={i} className="effect-block">
      <p>{`${effectName[0].toUpperCase()}${effectName.slice(1)}`}</p>
      <ul>{allEffects}</ul>
      <div className="clearfix" style={{'clear': 'both'}}></div>
    </div>;
  });

  return <div className="effects">
    <p className="header">Effect</p>
    <p className="header">Affects</p>
    <ul>{effectBlocks}</ul>
  </div>;
};

Effects.propTypes = {
  effects: PropTypes.object
};
