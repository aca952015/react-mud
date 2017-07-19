'use strict';

import {removeEffect, damageUser, fullRestore} from '../actions/combat-actions.js';

export default function rezzHandler(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;

  socket.on('resurrect', () => {
    props.dispatch(fullRestore());
    props.dispatch(damageUser({damage: Math.round(homeCtx.props.maxHP / 2)}));
    props.dispatch(removeEffect('death'));
    let transmittedEffects = {...homeCtx.props.effects};
    delete transmittedEffects.death;
    socket.emit('updateEffects', transmittedEffects);
  });
}
