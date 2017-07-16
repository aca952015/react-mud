'use strict';

import slayEnemy from '../lib/slay-enemy.js';

export default function skill(socket, roomData, mobsInCombat, alteredRooms) {
  socket.on('skill', skillObj => {
    // When the user emits a damage event, find the targeted mob. If it's already
    // been killed (say, by another player), return a slayEnemy event.
    let target = roomData[socket.currentRoom].mobs.find(mob => mob.id === skillObj.enemy.id);
    if (!target) return socket.emit('slayEnemy', skillObj.enemy);
    target.hp -= skillObj.damage;
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {combatLog: skillObj.echoLog});
    if (target.hp < 1) slayEnemy(target, roomData, alteredRooms, mobsInCombat, socket);
  });
}
