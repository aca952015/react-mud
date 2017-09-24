'use strict';

import sinon from 'sinon';
import newMob from '../../app/data/mobs.js';
import {academyMobSkills} from '../../app/data/skills/academy-mob-skills.js';
import enemyUseSkill from '../../lib/enemy-use-skill.js';

describe('enemyUseSkill', () => {
  const bat = newMob('bat', 'Test - Nexus');
  bat.skills.heal = academyMobSkills.heal;
  bat.combat.targets.push('player1');
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
      to: function() {
        return {emit: sinon.stub()};
      }
    }
  };
  const mobsInCombat = [bat];

  describe('With all abilities on cooldown', () => {
    it('should reduce the remaining cooldown by 1, then return', () => {
      bat.skills.heal.cooldownRemaining = 2;
      bat.skills.bash.cooldownRemaining = 2;
      enemyUseSkill(mobsInCombat, users, io);
      expect(bat.skills.heal.cooldownRemaining).toEqual(1);
      expect(bat.skills.bash.cooldownRemaining).toEqual(1);
    });
  });

  describe('With a damage ability off cooldown and selected', () => {
    it('should call enemyDamageSkill', () => {
      bat.skills.heal.cooldownRemaining = 2;
      bat.skills.bash.cooldownRemaining = 0;
      enemyUseSkill(mobsInCombat, users, io);
      expect(users[0].emit.calledWith('damage', {damage: 5})).toEqual(true);
    });
  });

  describe('With a healing ability off cooldown and selected', () => {
    it('should call enemyHealSkill', () => {
      bat.skills.heal.cooldownRemaining = 0;
      bat.skills.bash.cooldownRemaining = 2;
      bat.hp = bat.maxHP - 1;
      enemyUseSkill(mobsInCombat, users, io);
      expect(bat.skills.heal.cooldownRemaining).toEqual(2);
    });
  });
});
