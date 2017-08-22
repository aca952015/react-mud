'use strict';

import newItem from '../app/data/items.js';

export default function slayEnemy(target, roomData, alteredRooms, mobsInCombat, socket) {
  // If the enemy is at 0 or less HP, they are dead. Generate a new corpse item,
  // then change its appearance to mimic the mob killed.
  const corpse = newItem('containers', 'corpse');
  corpse.name = `${target.name} corpse`;
  corpse.short = `${target.short}'s corpse`;
  corpse.long = `The corpse of ${target.short} lies here.`;
  corpse.terms = corpse.terms.concat(target.terms);
  corpse.description = `The corpse of ${target.short} lies here.`;

  // Remove the mob from the mobsInCombat array so that they do not continue to attack the
  // player as phantoms. Push the room name to the alteredRooms array so the server knows
  // to respawn mobs.
  if (!alteredRooms.includes(socket.currentRoom)) alteredRooms.push(socket.currentRoom);
  mobsInCombat.splice(mobsInCombat.indexOf(mobsInCombat.find(mob => mob.id === target.id)), 1);
  roomData[socket.currentRoom].mobs.splice(roomData[socket.currentRoom].mobs.indexOf(target), 1);
  roomData[socket.currentRoom].items.push(corpse);
  socket.emit('generalMessage', {
    combatLog: {
      from: {
        friendly: 'You'
      },
      interaction: ' have slain ',
      target: {
        enemy: target.short
      },
      punctuation: '!'
    }
  });
  socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
    combatLog: {
      from: {
        friendly: socket.username
      },
      interaction: ' has slain ',
      target: {
        enemy: target.short
      },
      punctuation: '!'
    }
  });
  socket.emit('slayEnemy', target);
  socket.broadcast.to(socket.currentRoom).emit('slayEnemy', target);
}
