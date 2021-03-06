'use strict';

import {newMessage} from '../actions/message-actions.js';
import {enterCombat, slayEnemy, addEffect, escapeCombat} from '../actions/combat-actions.js';
import {startCooldown, endCooldown, startGlobalCooldown, endGlobalCooldown, refreshDuration} from '../actions/skill-actions.js';
import {changeStat} from '../actions/user-actions.js';
import {loginEffects} from '../actions/login-actions.js';
import combatProcessor from '../processors/combat-processor.js';
import {classSkills} from '../data/class-skills.js';

// Because functions can't be transmitted via JSON (necessary for sockets), we need reference
// to them again here.
const allSkills = {
  ...classSkills['warriorSkills'],
  ...classSkills['clericSkills']
};

export default function combatHandlers(homeCtx) {
  const socket = homeCtx.socket;
  const props = homeCtx.props;

  socket.on('enterCombat', target => {
    if (homeCtx.props.combat.targets.find(mob => mob.id === target.id)) return props.dispatch(newMessage({feedback: `You're already fighting ${target.short}!`}));
    props.dispatch(newMessage({
      combatLog: {
        from: {
          friendly: 'You'
        },
        interaction: ' move to attack ',
        target: {
          enemy: target.short
        },
        punctuation: '.'
      }
    }));
    props.dispatch(enterCombat(target));
  });
  socket.on('addEffect', effectObj => {
    // If the user already has the effect (and it has a duration), refresh the duration
    if (homeCtx.props.effects[effectObj.effectName] && homeCtx.props.effects[effectObj.effectName].duration) {
      return props.dispatch(refreshDuration({effectName: effectObj.effectName, duration: effectObj.effects.duration}));
    }
    // Otherwise, apply the effects of the skill's applyFunction and set the expireFunction
    // for a future callback.
    allSkills[effectObj.skillName].applyFunction(props.dispatch);
    effectObj.expireFunction = allSkills[effectObj.skillName].expireFunction;
    props.dispatch(addEffect(effectObj));
  });
  socket.on('damage', dmgObj => {
    props.dispatch(changeStat({
      statToChange: 'hp',
      amount: dmgObj.damage
    }));

    // Sometimes the user can take damage from sources other than an enemy.
    if (dmgObj.enemy) {
      props.dispatch(newMessage({
        combatLog: {
          from: {
            enemy: `${dmgObj.enemy.short[0].toUpperCase()}${dmgObj.enemy.short.slice(1)}`,
          },
          pre: ' deals ',
          damage: dmgObj.damage,
          post: ' damage to ',
          target: {
            friendly: 'you'
          },
          punctuation: '.'
        }
      }));
    }

    if (homeCtx.props.hp <= 0 && !homeCtx.props.effects.death) {
      props.dispatch(newMessage({feedback: 'You have been SLAIN!'}));
      props.dispatch(escapeCombat());
      props.dispatch(loginEffects({loginEffects: {death: true}}));
      socket.emit('escapeCombat');
      socket.emit('playerDeath');
      socket.emit('updateEffects', {death: true});
    }
  });
  socket.on('slayEnemy', enemy => props.dispatch(slayEnemy(enemy)));
  socket.on('combatTick', () => {
    // For some reason, props does not actually update accordingly with the state of the Home
    // component. The current state can only be correctly referred to by using homeCtx.props instead of
    // assigning homeCtx.props to a variable and using that.
    if (homeCtx.props.combat.active) {
      props.dispatch(changeStat({
        statToChange: 'sp',
        amount: -2
      }));
      combatProcessor(socket, homeCtx.props);
    }
    // If the user is not in combat and has SP, it needs to decay on each combat tick.
    if (!homeCtx.props.combat.active && homeCtx.props.sp > 0) props.dispatch(changeStat({
      statToChange: 'sp',
      amount: 4
    }));
  });
  socket.on('startCooldown', skill => {
    // Skills need to deduct the cost from the user's stats, but also increase their SP.
    // e.g., a skill costs 4 MP, but also provides 5 SP upon use. These need to be
    // separate calls, so they are both dispatched here.
    // The reason this logic is handled here is because the socket only receives a startCooldown
    // event if the server needed to check for a target first. Otherwise this logic would happen
    // as part of the commandHandler process on the command-input container.
    props.dispatch(changeStat({
      statToChange: skill.statToDeduct,
      amount: skill.deductAmount
    }));
    props.dispatch(changeStat({
      statToChange: skill.statToChange,
      amount: -(skill.amount)
    }));
    props.dispatch(startGlobalCooldown());
    setTimeout(() => props.dispatch(endGlobalCooldown()), 2000);
    if (skill.cooldownTimer) {
      props.dispatch(startCooldown({skillName: skill.skillName}));
      setTimeout(() => props.dispatch(endCooldown({skillName: skill.skillName})), skill.cooldownTimer);
    }
  });
}
