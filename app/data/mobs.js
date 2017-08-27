'use strict';

import {testMobs} from './mobs/test-mobs.js';
import {nonCombatNPCs} from './mobs/non-combat-npcs.js';
import {academyMobs} from './mobs/academy-mobs.js';

class Mob {
  constructor(properties) {
    // Because Object.assign(), for in loops, and various other standard ways of
    // using constructors only create a shallow copy, we can't use them to properly
    // instantiate new objects from mobData (since there are nested objects and arrays).
    // Stringifying, then parsing it is a quick hack to give us a deep clone.
    let someObj = JSON.parse(JSON.stringify(properties));
    someObj.id = Math.floor(Math.random() * 1000000000);

    // All mobs start out of combat with no targets
    someObj.combat = {
      active: false,
      targets: []
    };
    return someObj;
  }
}

export default function newMob(mobName) {
  return new Mob(mobData[mobName]);
}

const mobData = {
  ...testMobs,
  ...nonCombatNPCs,
  ...academyMobs
};
