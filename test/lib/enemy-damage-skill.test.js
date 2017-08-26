'use strict';

import sinon from 'sinon';
import enemyDamageSkill from '../../lib/enemy-damage-skill.js';
import newMob from '../../app/data/mobs.js';

describe('EnemyDamageSkill', () => {
  const mobsInCombat = [{
    ...newMob('bat'),
    combat: {
      active: true,
      targets: ['player1']
    }
  }];
  const users = [{
    username: 'player1',
    equipment: {
      head: null,
      shoulders: null,
      'main hand': null,
      'off hand': null,
      chest: null,
      leggings: null,
      feet: null
    },
    currentRoom: 'Nexus',
    emit: sinon.spy()
  }];
  const io = sinon.stub();

  describe('With an ability that is on cooldown', () => {
    it('should decrement the skill\'s cooldownRemaining, then return nothing', () => {
      expect(enemyDamageSkill(mobsInCombat, users, io)).toEqual(undefined);
      expect(mobsInCombat[0].skills.bash.cooldownRemaining).toEqual(0);
    });
  });

  describe('With an ability that is off cooldown, but for which there is no existing target', () => {
    it('should return undefined', () => {
      const noUsers = [];
      expect(enemyDamageSkill(mobsInCombat, noUsers, io)).toEqual(undefined);
    });
  });
});
