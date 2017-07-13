'use strict';

export default function escapeCombat(io, socket, mobsInCombat) {
  socket.on('escapeCombat', () => {
    let mobsFightingUser = mobsInCombat.filter(mob => mob.combat.targets.includes(socket.username));
    mobsFightingUser.forEach(mob => {
      mob.combat.targets.splice(mob.combat.targets.indexOf(socket.username), 1);
      if (!mob.combat.targets.length) {
        mobsInCombat.splice(mobsInCombat.indexOf(mob), 1);
        mob.hp = mob.maxHP;
        mob.combat.active = false;
        return io.sockets.to(socket.currentRoom).emit('generalMessage', {feedback: `${mob.short[0].toUpperCase()}${mob.short.slice(1)} returns to full health.`});
      }
      return socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${mob.short[0].toUpperCase()}${mob.short.slice(1)} turns their attention to other combatants!`});
    });
  });
}
