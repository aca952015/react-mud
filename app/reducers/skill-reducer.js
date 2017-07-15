'use strict';

import {classSkills} from '../data/class-skills.js';

export default function reducer(state={...classSkills['warriorSkills']}, action) {
  if (action.type === 'SET_SKILLS') return {...classSkills[action.payload]};
  if (action.type === 'ON_COOLDOWN') {
    let newState = {...state};
    newState[action.payload].onCooldown = true;
    return newState;
  }
  if (action.type === 'OFF_COOLDOWN') {
    let newState = {...state};
    newState[action.payload].onCooldown = false;
    return newState;
  }
  if (action.type === 'START_GLOBAL_COOLDOWN') return {...state, globalCooldown: true};
  if (action.type === 'END_GLOBAL_COOLDOWN') return {...state, globalCooldown: false};
  return {...state};
}
