'use strict';

import {removeEffect, damageUser, fullRestore} from '../actions/combat-actions.js';

export default function rezzHandler(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;

  socket.on('resurrect', () => {
    props.dispatch(fullRestore());
    props.dispatch(damageUser(Math.round(homeCtx.props.maxHP / 2)));
    Promise.resolve(props.dispatch(removeEffect('death')))
    .then(() => socket.emit('updateEffects', homeCtx.props.effects));
  });
}
