'use strict';

export default function reducer(state={}, action) {
  switch(action.type) {
    case 'ADD_EFFECT': {
      const tempState = {...state};
      tempState[action.payload.effectName] = action.payload.effects;
      if (action.payload.expirationMessage) tempState[action.payload.effectName].expirationMessage = action.payload.expirationMessage;
      if (action.payload.expireFunction) tempState[action.payload.effectName].expireFunction = action.payload.expireFunction;
      return tempState;
    }
    case 'DECREMENT_EFFECT_DURATIONS': {
      const tempState = JSON.parse(JSON.stringify(state));
      for (let key in state) {
        if (state[key].duration) {
          let remainingDuration = state[key].duration;
          remainingDuration--;
          if (remainingDuration < 1) delete tempState[key];
          else {
            tempState[key].expireFunction = state[key].expireFunction;
            tempState[key].duration = remainingDuration;
          }
        }
      }
      return tempState;
    }
    case 'LOGIN_EFFECTS': return action.payload;
    case 'REFRESH_DURATION': {
      const tempState = JSON.parse(JSON.stringify(state));
      tempState[action.payload.effectName].duration = action.payload.duration;
      tempState[action.payload.effectName].expireFunction = state[action.payload.effectName].expireFunction;
      return tempState;
    }
    case 'REMOVE_EFFECT': {
      const tempState = {...state};
      delete tempState[action.payload];
      return tempState;
    }
    default: {
      return state;
    }
  }
}
