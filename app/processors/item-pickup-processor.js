'use strict';

import {roomData} from '../data/rooms.js';

export default function ItemPickUpProcessor(room, socket) {
  let roomItems = roomData[room.room.pickRoom].items;
  roomItems.splice(roomItems.indexOf(room.room.item));
  if (socket.currentRoom !== room.room.pickRoom) return {};
  return {text: `${room.from} picks up ${room.room.item.short}.`};
}