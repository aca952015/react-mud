'use strict';

import {roomData} from '../data/rooms.js';

export default function ItemPickUpProcessor(room, currentRoom) {
  let roomItems = roomData[room.room.pickRoom].items;
  roomItems.splice(roomItems.indexOf(room.room.item));
  if (currentRoom !== room.room.pickRoom) return {};
  return {
    from: room.from,
    feedback: ` picks up ${room.room.item.short}.`
  };
}
