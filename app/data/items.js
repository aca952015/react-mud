'use strict';

import {equipment} from './items/equipment.js';
import {keys} from './items/keys.js';
import {potions} from './items/potions.js';
import {containers} from './items/containers.js';
import {weapons} from './items/weapons.js';
import {doodads} from './items/doodads.js';

class Item {
  constructor(properties) {
    // Because Object.assign(), for in loops, and various other standard ways of
    // using constructors only create a shallow copy, we can't use them to properly
    // instantiate new objects from itemData (since there are nested objects and arrays).
    // Stringifying, then parsing it is a quick hack to give us a deep clone.
    let someObj = JSON.parse(JSON.stringify(properties));
    someObj.id = Math.floor(Math.random() * 1000000000);
    return someObj;
  }
}

export default function newItem(itemType, itemName) {
  return new Item(itemData[itemType][itemName]);
}

// To better organize itemData, they are split up into different sections. When a new
// item is constructed, it is done by calling newItem(<type>, <name>).
export const itemData = {
  containers,
  equipment,
  keys,
  potions,
  weapons,
  doodads
};
