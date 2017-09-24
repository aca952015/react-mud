'use strict';

import {testMobs} from './mobs/test-mobs.js';
import {nonCombatNPCs} from './mobs/non-combat-npcs.js';
import {academyMobs} from './mobs/academy-mobs.js';

class Mob {
  constructor(properties, currentRoom) {
    // Because Object.assign(), for in loops, and various other standard ways of
    // using constructors only create a shallow copy, we can't use them to properly
    // instantiate new objects from mobData (since there are nested objects and arrays).
    // Stringifying, then parsing it is a quick hack to give us a deep clone.
    const mobObj = JSON.parse(JSON.stringify(properties));
    mobObj.id = Math.floor(Math.random() * 1000000000);

    // All mobs start out of combat with no targets
    mobObj.combat = {
      active: false,
      targets: []
    };
    mobObj.currentRoom = currentRoom;
    return mobObj;
  }
}

export default function newMob(mobName, currentRoom) {
  return new Mob(mobData[mobName], currentRoom);
}

const mobData = {
  ...testMobs,
  ...nonCombatNPCs,
  ...academyMobs
};
