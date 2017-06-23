'use strict';

export default function damage(socket, roomData) {
  socket.on('damage', dmgObj => {
    let target = roomData[socket.currentRoom].mobs.find(mob => mob.short === dmgObj.enemy.short);
    target.hp -= dmgObj.damage;
    if (target.hp < 1) {
      roomData[socket.currentRoom].mobs.splice(roomData[socket.currentRoom].mobs.indexOf(target, 1));
      socket.emit('generalMessage', {feedback: `You've slain ${target.short}!`});
      socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${socket.username} has slain ${target.short}!`});
      return socket.emit('endCombat');
    }
    socket.emit('damage', {
      enemy: target,
      damage: target.atk
    });
  });
}
