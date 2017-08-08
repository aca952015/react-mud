'use strict';

import {tickRegen} from '../actions/user-actions.js';
import {decrementEffectDurations} from '../actions/skill-actions.js';
import {newMessage} from '../actions/message-actions.js';

export default function tickListeners(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;

  socket.on('tick', () => {
    if (!homeCtx.props.effects.death) props.dispatch(tickRegen());
    const expiringEffects = Object.values(homeCtx.props.effects).filter(effect => effect.duration && effect.duration <= 1);
    expiringEffects.forEach(effect => {
      effect.expireFunction(props.dispatch);
      props.dispatch(newMessage({feedback: effect.expirationMessage}));
    });
    props.dispatch(decrementEffectDurations());
  });
}
