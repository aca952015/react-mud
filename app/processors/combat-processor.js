'use strict';

export default function combatProcessor(socket, props) {
  // Pick a random enemy among the targets currently being fought and damage them.
  let rand = Math.floor(Math.random() * props.combat.targets.length);
  let enemy = props.combat.targets[rand];

  // Add up the atk bonuses from all equipped items, the user's atk, and the enemy's def
  // The final result is the amount of damage to deal. Damage cannot be less than 1.
  let damage = Object.keys(props.equipment).reduce((acc, slot) => {
    if (props.equipment[slot] && props.equipment[slot].stats.atk) acc += props.equipment[slot].stats.atk;
    return acc;
  }, 0) + props.atk - enemy.def;
  if (damage < 1) damage = 1;
  socket.emit('damage', {
    damage,
    enemy
  });
}
