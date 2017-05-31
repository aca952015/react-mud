'use strict';

import {roomData} from '../data/rooms.js';
import {itemData} from '../data/items.js';
import {getItem} from '../actions/inventory-actions.js';

export default function(command, args, socket) {
  if (roomData[socket.currentRoom].items[args]) {
    return {
      funcToCall: getItem,
      item: itemData[roomData[socket.currentRoom].items[args]]
    };
  }
}
