'use strict';

import slayEnemy from '../lib/slay-enemy.js';

export default function skill(socket, roomData, mobsInCombat, alteredRooms, users) {
  socket.on('skill', skillObj => {
    let target;
    if (skillObj.enemy.id) target = roomData[socket.currentRoom].mobs.find(mob => mob.id === skillObj.enemy.id);

    if (skillObj.skillTypes.includes('damage')) {
      if (!target) return socket.emit('slayEnemy', skillObj.enemy);
      target.hp -= skillObj.damage;
      socket.emit('generalMessage', {combatLog: skillObj.combatLog});
      socket.broadcast.to(socket.currentRoom).emit('generalMessage', {combatLog: skillObj.echoLog});
      if (target.hp < 1) return slayEnemy(target, roomData, alteredRooms, mobsInCombat, socket);
      return;
    }

    target = users.find(user => user.username.toLowerCase() === skillObj.enemy.toLowerCase());
    if (!target || target.currentRoom !== socket.currentRoom) return socket.emit('generalMessage', {feedback: 'I don\'t see that person here.'});
    if (target.effects.death) return socket.emit('generalMessage', {feedback: 'You can\'t heal a ghost.'});

    // If the user is targeting themselves, update the combatLogs accordingly.
    if (target.username.toLowerCase() === socket.username.toLowerCase()) {
      skillObj.echoLog.target.friendly = 'themself';
      skillObj.combatLog.target.friendly = 'yourself';
    }

    socket.emit('generalMessage', {combatLog: skillObj.combatLog});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {combatLog: skillObj.echoLog});
    target.emit('damage', {damage: skillObj.damage});
  });
}
