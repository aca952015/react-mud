'use strict';

import {removeEffect, fullRestore} from '../actions/combat-actions.js';
import {changeStat} from '../actions/user-actions.js';

export default function rezzHandler(homeCtx) {
  const socket = homeCtx.socket;
  const props = homeCtx.props;

  socket.on('resurrect', () => {
    props.dispatch(fullRestore());
    props.dispatch(changeStat({
      statToChange: 'hp',
      amount: Math.round(homeCtx.props.maxHP / 2)
    }));
    props.dispatch(removeEffect('death'));

    const transmittedEffects = {...homeCtx.props.effects};
    delete transmittedEffects.death;
    socket.emit('updateEffects', transmittedEffects);
  });
}
