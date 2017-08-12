'use strict';

export default function decrementEffects(mobsInCombat) {
  mobsInCombat.forEach(mob => {
    for (let key in mob.effects) {
      if (mob.effects[key].duration) {
        mob.effects[key].duration--;
        if (mob.effects[key].duration < 1) {
          mob.effects[key].expireFunction(mob);
          delete mob.effects[key];
        }
      }
    }
  });
}
