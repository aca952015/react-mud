'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Prompt = props => {
  const globalTimerBarStyles = {
    width: '20vw',
    height: '3vh',
    background: '#ff0000',
    position: 'absolute',
    animation: 'countdown 2s forwards linear'
  };

  return <div className="prompt">
    <p>HP: <span>{props.hp}</span><span> / </span><span>{props.maxHP}</span></p>
    <p>MP: <span>{props.mp}</span><span> / </span><span>{props.maxMP}</span></p>
    <p>SP: <span>{props.sp}</span><span> / </span><span>{props.maxSP}</span></p>
    {props.globalCooldown ? <section>
      <span>Global Cooldown</span>
      <div style={globalTimerBarStyles}></div>
    </section> : null}
  </div>;
};

Prompt.propTypes = {
  character: PropTypes.object,
  globalCooldown: PropTypes.bool,
  hp: PropTypes.number,
  mp: PropTypes.number,
  sp: PropTypes.number,
  maxHP: PropTypes.number,
  maxMP: PropTypes.number,
  maxSP: PropTypes.number
};
