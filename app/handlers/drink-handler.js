'use strict';

import {newMessage} from '../actions/message-actions.js';
import {quietlyAddItem, dropItem} from '../actions/inventory-actions.js';
import newItem, {itemData} from '../data/items.js';

export default function drinkHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Drink what?'};
  let index = 0;
  if (args.split('.').length > 1) index = args.split('.')[0] - 1;
  let itemToDrink = index > 0 ? props.inventory.filter(item => item.terms.includes(args.split('.')[1].toLowerCase()))[index] :
                                props.inventory.find(item => item.terms.includes(args.toLowerCase()));
  if (!itemToDrink) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  if (!itemToDrink.drink) return {funcsToCall: [newMessage], feedback: 'That isn\'t drinkable.'};

  let drinkEffects = itemData[itemToDrink.name].drink;

  return {
    funcsToCall: [newMessage, drinkEffects.effect, quietlyAddItem, dropItem],
    amount: drinkEffects.amount,
    statToChange: drinkEffects.statToChange,
    feedback: drinkEffects.desc,
    emitType: 'drink',
    item: itemToDrink,
    quietAdd: newItem('empty flask')
  };
}
