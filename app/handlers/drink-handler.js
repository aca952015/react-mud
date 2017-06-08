'use strict';

import {newMessage} from '../actions/message-actions.js';
import {itemData} from '../data/items.js';

export default function drinkHandler(command, args, socket, props) {
  let itemToDrink = props.inventory.find(item => item.terms.includes(args.toLowerCase()));
  if (!itemToDrink) return {funcsToCall: [newMessage], text: 'You aren\'t carrying that.'};
  if (!itemToDrink.drink) return {funcsToCall: [newMessage], text: 'That isn\'t drinkable.'};

  let drinkEffects = itemData[itemToDrink.name].drink;
  drinkEffects.effect(props.character, drinkEffects.amount);

  return {
    funcsToCall: [newMessage],
    text: drinkEffects.desc,
    emitType: 'drink',
    from: socket.username,
    item: itemToDrink
  };
}
