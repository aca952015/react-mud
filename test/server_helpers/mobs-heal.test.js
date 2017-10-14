'use strict';

import mobsHeal from '../../lib/mobs-heal.js';
import newMob from '../../app/data/mobs.js';

describe('mobsHeal', () => {
  describe('With a mob that has more than 1000 HP', () => {
    it('should heal that mob for 50 HP', () => {
      const bigHPMob = newMob('bat', 'Test - Nexus');
      const currentHP = bigHPMob.hp + 0;
      bigHPMob.maxHP = 1500;

      mobsHeal([bigHPMob]);
      expect(bigHPMob.hp).toEqual(currentHP + 50);
    });
  });

  describe('With a mob that has less than 1000 HP', () => {
    it('should heal that mob for 5% of its max HP', () => {
      const bat = newMob('bat', 'Test - Nexus');
      bat.hp = 1;

      mobsHeal([bat]);
      expect(bat.hp).toEqual(1 + (Math.ceil(bat.maxHP / 20)));
    });
  });

  describe('With a mob restoring more health than its max', () => {
    it('should heal the mob to full', () => {
      const bigHPBat = newMob('bat', 'Test - Nexus');
      bigHPBat.maxHP = 100;
      bigHPBat.hp = 99;

      mobsHeal([bigHPBat]);
      expect(bigHPBat.hp).toEqual(bigHPBat.maxHP);
    });
  });
});
