'use strict';

import sinon from 'sinon';
import enemyDamageSkill from '../../lib/enemy-damage-skill.js';
import newMob from '../../app/data/mobs.js';

describe('EnemyDamageSkill', () => {
  const mobsInCombat = [{
    ...newMob('bat', 'Test - Nexus'),
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
  const io = {
    sockets: {
      to: () => {
        return {emit: sinon.stub()};
      }
    }
  };

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

  describe('For a physical skill', () => {
    it('should deal 5 damage on a target with no equipment', () => {
      enemyDamageSkill(mobsInCombat, users, io);
      expect(users[0].emit.calledWith('damage', {damage: 5})).toEqual(true);
    });
  });

  describe('For a magical skill', () => {
    it('should deal 6 damage on a target with no equipment', () => {
      mobsInCombat[0].skills.bash.skillTypes = ['damage', 'magical'];
      mobsInCombat[0].skills.bash.cooldownRemaining = 0;
      mobsInCombat[0].mat = 6;
      enemyDamageSkill(mobsInCombat, users, io);
      expect(users[0].emit.calledWith('damage', {damage: 6})).toEqual(true);
    });
  });

  describe('For a skill that does less than 1 damage', () => {
    it('should deal 1 damage', () => {
      mobsInCombat[0].skills.bash.cooldownRemaining = 0;
      mobsInCombat[0].mat = 0;
      enemyDamageSkill(mobsInCombat, users, io);
      expect(users[0].emit.calledWith('damage', {damage: 1})).toEqual(true);
    });
  });

  describe('With a mob that has no skills', () => {
    it('should return from the function', () => {
      users[0].emit = sinon.spy();
      enemyDamageSkill([newMob('armored zombie', 'Test - Nexus')], users, io);
      expect(users[0].emit.called).toEqual(false);
    });
  });
});
