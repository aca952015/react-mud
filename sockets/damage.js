'use strict';

export default function damage(socket, roomData, mobsInCombat) {
  socket.on('damage', dmgObj => {
    let target = roomData[socket.currentRoom].mobs.find(mob => mob.id === dmgObj.enemy.id);
    if (!target) return socket.emit('endCombat', dmgObj.enemy.id);
    target.hp -= dmgObj.damage;
    socket.emit('generalMessage', {feedback: `You deal ${dmgObj.damage} damage to ${target.short}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${socket.username} deals ${dmgObj.damage} damage to ${target.short}.`});
    if (target.hp < 1) {
      mobsInCombat.splice(mobsInCombat.indexOf(mobsInCombat.find(mob => mob.id === target.id)), 1);
      roomData[socket.currentRoom].mobs.splice(roomData[socket.currentRoom].mobs.indexOf(target), 1);
      socket.emit('generalMessage', {
        combatLog: {
          from: 'You',
          interaction: ' have slain ',
          target: `${target.short}!`
        }
      });
      socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
        combatLog: {
          from: socket.username,
          interaction: ' has slain ',
          target: `${target.short}!`
        }
      });
      socket.emit('slayEnemy', target);
      socket.broadcast.to(socket.currentRoom).emit('slayEnemy', target);
    }
  });
}
