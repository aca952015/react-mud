'use strict';

import sinon from 'sinon';
import newMob from '../../app/data/mobs.js';
import enemyHealSkill from '../../lib/enemy-heal-skills.js';
import {academyMobSkills} from '../../app/data/skills/academy-mob-skills.js';

describe('enemyHealSkill', () => {
  const bat = newMob('bat', 'Test - Nexus');
  const bat2 = newMob('bat', 'Test - Nexus');
  bat.skills.heal = academyMobSkills.heal;
  bat.combat.targets.push('player1');

  const io = {
    sockets: {
      to: function() {
        return {emit: sinon.stub()};
      }
    }
  };
  const mobsInCombat = [bat, bat2];

  describe('With no mobs missing health', () => {
    it('should return', () => {
      bat.skills.heal.cooldownRemaining = 0;
      enemyHealSkill(bat.skills.heal, bat, mobsInCombat, io);
      expect(bat.skills.heal.cooldownRemaining).toEqual(0);
    });
  });

  describe('With a mob missing less health than the ability heals for', () => {
    it('should restore the mob to full health', () => {
      bat.mat = 50;
      bat.hp = bat.maxHP - 1;
      enemyHealSkill(bat.skills.heal, bat, mobsInCombat, io);
      expect(bat.hp).toEqual(bat.maxHP);
      bat.mat = 1;
    });
  });

  describe('With a mob missing more health than the ability heals for', () => {
    it('should restore that much health to the mob', () => {
      bat.hp = 1;
      enemyHealSkill(bat.skills.heal, bat, mobsInCombat, io);
      expect(bat.hp).toEqual(2);
    });
  });

  describe('With another mob missing health', () => {
    it('should heal the other mob', () => {
      bat.hp = bat.maxHP;
      bat2.hp = 1;
      enemyHealSkill(bat.skills.heal, bat, mobsInCombat, io);
      expect(bat2.hp).toEqual(2);
    });
  });

  describe('If the skill is physical', () => {
    it('should use the mob\'s atk instead of mat', () => {
      bat2.hp = bat2.maxHP;
      bat.atk = 2;
      bat.hp = 1;
      bat.skills.heal.skillTypes = ['physical', 'healing'];
      enemyHealSkill(bat.skills.heal, bat, mobsInCombat, io);
      expect(bat.hp).toEqual(3);
    });
  });
});
