'use strict';

import {newMessage} from '../actions/message-actions.js';
import {quietlyAddItem, dropItem} from '../actions/inventory-actions.js';
import newItem, {itemData} from '../data/items.js';
import termsProcessor from '../processors/terms-processor.js';

export default function drinkHandler(command, args, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Drink what?'};
  args = args.toLowerCase();

  const itemToDrink = termsProcessor(props.inventory, args.split('.'));
  if (!itemToDrink) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  if (!itemToDrink.drink) return {funcsToCall: [newMessage], feedback: 'That isn\'t drinkable.'};

  const drinkEffects = itemData['potions'][itemToDrink.name].drink;

  return {
    funcsToCall: [newMessage, drinkEffects.effect, quietlyAddItem, dropItem],
    amount: -(drinkEffects.amount),
    statToChange: drinkEffects.statToChange,
    feedback: drinkEffects.desc,
    emitType: 'drink',
    item: itemToDrink,
    quietAdd: newItem('containers', 'glass flask')
  };
}
