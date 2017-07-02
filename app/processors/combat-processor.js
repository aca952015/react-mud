'use strict';

export default function combatProcessor(socket, props) {
  let rand = Math.floor(Math.random() * props.combat.targets.length);
  let enemy = props.combat.targets[rand];
  socket.emit('damage', {
    damage: props.atk,
    enemy
  });
}
