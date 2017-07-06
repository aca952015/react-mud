'use strict';

export default function combatProcessor(socket, props) {
  // Pick a random enemy among the targets currently being fought and damage them.
  let rand = Math.floor(Math.random() * props.combat.targets.length);
  let enemy = props.combat.targets[rand];
  socket.emit('damage', {
    damage: props.atk,
    enemy
  });
}
