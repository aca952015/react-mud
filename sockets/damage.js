'use strict';

export default function damage(socket, roomData, mobsInCombat) {
  socket.on('damage', dmgObj => {
    let target = roomData[socket.currentRoom].mobs.find(mob => mob.id === dmgObj.enemy.id);
    if (!target) return socket.emit('endCombat', dmgObj.enemy.id);
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
    if (target.hp < 1) {
      mobsInCombat.splice(mobsInCombat.indexOf(mobsInCombat.find(mob => mob.id === target.id)), 1);
      roomData[socket.currentRoom].mobs.splice(roomData[socket.currentRoom].mobs.indexOf(target), 1);
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
  });
}