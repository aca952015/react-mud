'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Effects = props => {
  const effectBlocks = Object.keys(props.effects).map((effectName, i) => {
    const allEffects = Object.keys(props.effects[effectName]).reduce((acc, effectStat, j) => {
      if (effectStat !== 'duration') {
        acc.push(<li key={j}>
          <span>{`${effectStat[0].toUpperCase()}${effectStat.slice(1)}`}: </span>
          <span>{props.effects[effectName][effectStat] > 0 ? '+' : '-'}{props.effects[effectName][effectStat]}</span>
        </li>);
      }
      return acc;
    }, []);

    const tickGrammar = props.effects[effectName].duration === 1 ? 'tick' : 'ticks';
    return <div key={i} className="effect-block">
      <p>{`${effectName[0].toUpperCase()}${effectName.slice(1)}`} {props.effects[effectName].duration ? `(${props.effects[effectName].duration} ${tickGrammar})` : null }</p>
      <ul>{allEffects}</ul>
      <div className="clearfix" style={{'clear': 'both'}}></div>
    </div>;
  });

  return <div className="effects">
    <p className="header">Effect</p>
    <p className="header">Affects</p>
    <ul>{effectBlocks}</ul>
    <div className="clearfix" style={{'clear': 'both'}}></div>
  </div>;
};

Effects.propTypes = {
  effects: PropTypes.object
};
