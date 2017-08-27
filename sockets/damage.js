'use strict';

import slayEnemy from '../lib/slay-enemy.js';

export default function damage(socket, roomData, mobsInCombat, alteredRooms) {
  socket.on('damage', dmgObj => {
    // When the user emits a damage event, find the targeted mob. If it's already
    // been killed (say, by another player), return a slayEnemy event.
    const target = roomData[socket.currentRoom].mobs.find(mob => mob.id === dmgObj.enemy.id);
    if (!target) return socket.emit('slayEnemy', dmgObj.enemy);

    target.hp -= dmgObj.damage;

    socket.emit('generalMessage', {
      combatLog: {
        from: {
          friendly: 'You'
        },
        pre: ' deal ',
        damage: dmgObj.damage,
        post: ' damage to ',
        target: {
          enemy: target.short
        },
        punctuation: '.'
      }
    });
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      combatLog: {
        from: {
          friendly: socket.username
        },
        pre: ' deals ',
        damage: dmgObj.damage,
        post: ' damage to ',
        target: {
          enemy: target.short
        },
        punctuation: '.'
      }
    });

    if (target.hp < 1) slayEnemy(target, roomData, alteredRooms, mobsInCombat, socket);
  });
}
