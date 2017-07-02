'use strict';

import {equipment} from './items/equipment.js';
import {keys} from './items/keys.js';
import {potions} from './items/potions.js';
import {containers} from './items/containers.js';

class Item {
  constructor(properties) {
    let someObj = JSON.parse(JSON.stringify(properties));
    someObj.id = Math.floor(Math.random() * 1000000000);
    return someObj;
  }
}

export default function newItem(itemType, itemName) {
  return new Item(itemData[itemType][itemName]);
}

export const itemData = {
  containers,
  equipment,
  keys,
  potions
};
