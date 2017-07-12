'use strict';

import itemRespawnProcessor from '../app/processors/item-respawn-processor.js';
import newItem from '../app/data/items.js';
import newMob from '../app/data/mobs.js';

export default function respawnItems(roomData, roomReset) {
  const roomNames = Object.keys(roomReset);
  for (let i = 0; i < roomNames.length; i++) {
    const currentRoom = roomData[roomNames[i]];
    const itemsToRespawn = itemRespawnProcessor(roomReset[roomNames[i]].items, currentRoom.items);
    const mobsToRespawn = itemRespawnProcessor(roomReset[roomNames[i]].mobs, currentRoom.mobs);
    if (itemsToRespawn.length) {
      currentRoom.itemResetTimer++;
      if (currentRoom.itemResetTimer > 3) {
        itemsToRespawn.forEach(item => {
          currentRoom.items.push(newItem(item.category, item.name));
        });
        currentRoom.itemResetTimer = 0;
      }
    }
    if (mobsToRespawn.length) {
      currentRoom.mobResetTimer++;
      if (currentRoom.mobResetTimer > 3) {
        mobsToRespawn.forEach(mob => {
          currentRoom.mobs.push(newMob(mob.name));
        });
        currentRoom.mobResetTimer = 0;
      }
    }
  }
}
