'use strict';

import slayEnemy from '../lib/slay-enemy.js';
import {classSkills} from '../app/data/class-skills.js';

const allSkills = Object.values(classSkills).reduce((acc, classObj) => {
  acc = {...acc, ...classObj};
  return acc;
}, {});

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

    if (skillObj.skillTypes.includes('debuff')) {
      if (!target) return socket.emit('slayEnemy', skillObj.enemy);
      if (target.effects[skillObj.effectName] && target.effects[skillObj.effectName].duration) {
        target.effects[skillObj.effectName].duration = skillObj.effects.duration;
        socket.emit('generalMessage', {combatLog: skillObj.combatLog});
        return socket.broadcast.to(socket.currentRoom).emit('generalMessage', {combatLog: skillObj.echoLog});
      }

      target.effects[skillObj.effectName] = skillObj.effects;
      target.effects[skillObj.effectName].expireFunction = allSkills[skillObj.skillName].expireFunction;
      allSkills[skillObj.skillName].applyFunction(target);

      socket.emit('generalMessage', {combatLog: skillObj.combatLog});
      return socket.broadcast.to(socket.currentRoom).emit('generalMessage', {combatLog: skillObj.echoLog});
    }

    target = users.find(user => user.username.toLowerCase() === skillObj.enemy.toLowerCase());
    if (!target || target.currentRoom !== socket.currentRoom) return socket.emit('generalMessage', {feedback: 'I don\'t see that person here.'});
    if (target.effects.death) {
      if (skillObj.skillTypes.includes('healing')) return socket.emit('generalMessage', {feedback: 'You can\'t heal a ghost.'});
      else return socket.emit('generalMessage', {feedback: 'You can\'t target ghosts with that.'});
    }

    // If the user is targeting themselves, update the combatLogs accordingly.
    if (target.username.toLowerCase() === socket.username.toLowerCase()) {
      skillObj.echoLog.target.friendly = 'themself';
      skillObj.combatLog.target.friendly = 'yourself';
    }

    socket.emit('generalMessage', {combatLog: skillObj.combatLog});
    if (!skillObj.funcsToCall.length) socket.emit('startCooldown', {
      skillName: skillObj.skillName,
      cooldownTimer: skillObj.cooldownTimer,
      statToDeduct: skillObj.skillCost.stat,
      deductAmount: skillObj.skillCost.value,
      statToChange: 'sp',
      amount: skillObj.amount
    });
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {combatLog: skillObj.echoLog});
    if (skillObj.skillTypes.includes('healing')) return target.emit('damage', {damage: skillObj.damage});

    if (target.username.toLowerCase() !== socket.username.toLowerCase()) {
      target.emit('addEffect', {
        effectName: skillObj.effectName,
        effects: skillObj.effects,
        expirationMessage: skillObj.expirationMessage,
        skillName: skillObj.skillName
      });
    }
  });
}
