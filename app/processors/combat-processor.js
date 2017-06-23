'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function combatProcessor(socket, props) {
  socket.emit('damage', {
    damage: props.character.atk,
    enemy: props.combat.target
  });
  props.dispatch(newMessage({feedback: `You hit ${props.combat.target.short} for ${props.character.atk} damage.`}));
}
