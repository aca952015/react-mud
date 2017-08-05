'use strict';

import {tickRegen} from '../actions/user-actions.js';
import {decrementEffectDurations} from '../actions/skill-actions.js';

export default function tickListeners(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;

  socket.on('tick', () => {
    if (!homeCtx.props.effects.death) props.dispatch(tickRegen());
    props.dispatch(decrementEffectDurations());
  });
}
