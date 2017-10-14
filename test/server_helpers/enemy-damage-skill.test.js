'use strict';

import sinon from 'sinon';
import enemyDamageSkill from '../../lib/enemy-damage-skill.js';
import newMob from '../../app/data/mobs.js';

describe('EnemyDamageSkill', () => {
  const mobInCombat = {
    ...newMob('bat', 'Test - Nexus'),
    combat: {
      active: true,
      targets: ['player1']
    }
  };
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
  const io = {
    sockets: {
      to: () => {
        return {emit: sinon.stub()};
      }
    }
  };

  describe('With an ability that is off cooldown, but for which there is no existing target', () => {
    it('should return undefined', () => {
      const noUsers = [];
      expect(enemyDamageSkill(mobInCombat.skills.bash, mobInCombat, noUsers, io)).toEqual(undefined);
    });
  });

  describe('For a physical skill', () => {
    it('should deal 5 damage on a target with no equipment', () => {
      enemyDamageSkill(mobInCombat.skills.bash, mobInCombat, users, io);
      expect(users[0].emit.calledWith('damage', {damage: 5})).toEqual(true);
    });
  });

  describe('For a magical skill', () => {
    it('should deal 6 damage on a target with no equipment', () => {
      mobInCombat.skills.bash.skillTypes = ['damage', 'magical'];
      mobInCombat.skills.bash.cooldownRemaining = 0;
      mobInCombat.mat = 6;
      enemyDamageSkill(mobInCombat.skills.bash, mobInCombat, users, io);
      expect(users[0].emit.calledWith('damage', {damage: 6})).toEqual(true);
    });
  });

  describe('For a skill that does less than 1 damage', () => {
    it('should deal 1 damage', () => {
      mobInCombat.skills.bash.cooldownRemaining = 0;
      mobInCombat.mat = 0;
      enemyDamageSkill(mobInCombat.skills.bash, mobInCombat, users, io);
      expect(users[0].emit.calledWith('damage', {damage: 1})).toEqual(true);
    });
  });

  describe('With a mob that has no skills', () => {
    it('should return from the function', () => {
      users[0].emit = sinon.spy();
      enemyDamageSkill(mobInCombat.skills.bash, newMob('armored zombie', 'Test - Nexus'), users, io);
      expect(users[0].emit.called).toEqual(false);
    });
  });
});
