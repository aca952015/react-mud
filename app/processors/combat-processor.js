'use strict';

export default function combatProcessor(socket, props) {
  socket.emit('damage', {
    damage: props.character.atk,
    enemy: props.combat.target
  });
}
