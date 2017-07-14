'use strict';

import {newMessage} from '../actions/message-actions.js';
import {enterCombat, damageUser, slayEnemy, addEffect, escapeCombat} from '../actions/combat-actions.js';
import combatProcessor from '../processors/combat-processor.js';

export default function combatHandlers(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;

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
  socket.on('damage', dmgObj => {
    props.dispatch(damageUser(dmgObj.damage));
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
    if (homeCtx.props.hp - dmgObj.damage <= 0 && !homeCtx.props.effects.death) {
      props.dispatch(newMessage({feedback: 'You have been SLAIN!'}));
      props.dispatch(escapeCombat());
      socket.emit('escapeCombat');
      socket.emit('playerDeath');
      props.dispatch(addEffect('death'));
      socket.emit('updateEffects', {...homeCtx.props.effects, death: true});
    }
  });
  socket.on('slayEnemy', enemy => props.dispatch(slayEnemy(enemy)));
  socket.on('combatTick', () => {
    // For some reason, props does not actually update accordingly with the state of the Home
    // component. The current state can only be correctly referred to by using homeCtx.props instead of
    // assigning homeCtx.props to a variable and using that.
    if (homeCtx.props.combat.active) combatProcessor(socket, homeCtx.props);
  });
}
