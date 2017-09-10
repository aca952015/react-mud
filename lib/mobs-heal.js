'use strict';

export default function mobsHeal(mobsInCombat) {
  mobsInCombat.forEach(mob => {
    let healAmount = Math.ceil(mob.maxHP / 20);
    if (healAmount > 50) healAmount = 50;

    mob.hp += healAmount;
    if (mob.hp > mob.maxHP) mob.hp = mob.maxHP;
  });
}
