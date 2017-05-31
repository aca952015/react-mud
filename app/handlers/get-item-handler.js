'use strict';

import {itemData} from '../data/items.js';
import {newMessage} from '../actions/message-actions.js';
import {getItem} from '../actions/inventory-actions.js';

export default function(command, args, socket, rooms) {
  let roomItems = rooms[socket.currentRoom].items;
  let item = roomItems.find(_item => _item.terms.includes(args.toLowerCase()));
  if (!item) return {funcsToCall: [newMessage], text: 'I don\'t see that item here.'};
  roomItems.splice(roomItems.indexOf(item), 1);
  return {
    funcsToCall: [getItem, newMessage],
    item: itemData[item.name],
    emitType: 'pickUpItem',
    pickRoom: socket.currentRoom,
    text: `You pick up ${item.short}.`
  };
}
