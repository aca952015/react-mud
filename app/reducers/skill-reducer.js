'use strict';

import {classSkills} from '../data/class-skills.js';

export default function reducer(state={...classSkills['warriorSkills'], ...classSkills['clericSkills']}, action) {
  switch(action.type) {
    case 'END_GLOBAL_COOLDOWN': return {...state, globalCooldown: false};
    case 'OFF_COOLDOWN': {
      const newState = {...state};
      newState[action.payload].onCooldown = false;
      return newState;
    }
    case 'ON_COOLDOWN': {
      const newState = {...state};
      newState[action.payload].onCooldown = true;
      return newState;
    }
    case 'SET_SKILLS': return {...classSkills[action.payload]};
    case 'START_GLOBAL_COOLDOWN': return {...state, globalCooldown: true};
    default: return state;
  }
}
