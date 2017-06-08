'use strict';

import {newMessage} from '../actions/message-actions.js';
import {quietlyAddItem, quietlyDestroyItem} from '../actions/inventory-actions.js';
import {itemData} from '../data/items.js';

export default function drinkHandler(command, args, socket, props) {
  let itemToDrink = props.inventory.find(item => item.terms.includes(args.toLowerCase()));
  if (!itemToDrink) return {funcsToCall: [newMessage], text: 'You aren\'t carrying that.'};
  if (!itemToDrink.drink) return {funcsToCall: [newMessage], text: 'That isn\'t drinkable.'};

  let drinkEffects = itemData[itemToDrink.name].drink;
  drinkEffects.effect(props.character, drinkEffects.amount);

  return {
    funcsToCall: [newMessage, drinkEffects.effect, quietlyAddItem, quietlyDestroyItem],
    amount: drinkEffects.amount,
    text: drinkEffects.desc,
    emitType: 'drink',
    item: itemToDrink,
    quietAdd: itemData['empty flask']
  };
}
