'use strict';

import {roomData} from '../data/rooms.js';

export default function ItemPickUpProcessor(room) {
  let roomItems = roomData[room.room.pickRoom].items;
  roomItems.splice(roomItems.indexOf(room.room.item));
  return {text: `${room.from} picks up ${room.room.item.short}.`};
}
