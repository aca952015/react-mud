'use strict';

import itemRespawnProcessor from '../app/processors/item-respawn-processor.js';
import newItem from '../app/data/items.js';

export default function respawnItems(roomData, roomReset) {
  const roomNames = Object.keys(roomReset);
  for (let i = 0; i < roomNames.length; i++) {
    const currentRoom = roomData[roomNames[i]];
    const itemsToRespawn = itemRespawnProcessor(roomReset[roomNames[i]].items, currentRoom.items);
    if (itemsToRespawn.length) {
      currentRoom.resetTimer++;
      if (currentRoom.resetTimer > 3) {
        itemsToRespawn.forEach(item => {
          currentRoom.items.push(newItem(item.category, item.name));
        });
        currentRoom.resetTimer = 0;
      }
    }
  }
}
