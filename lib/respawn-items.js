'use strict';

import itemRespawnProcessor from '../app/processors/item-respawn-processor.js';
import newItem from '../app/data/items.js';
import newMob from '../app/data/mobs.js';

export default function respawnItems(roomData, roomReset, alteredRooms) {
  // Get the list of all rooms that have been slated for respawns
  const roomNames = alteredRooms;
  for (let i = 0; i < roomNames.length; i++) {
    const currentRoom = roomData[roomNames[i]];
    let itemsToRespawn = itemRespawnProcessor(roomReset[roomNames[i]].items, currentRoom.items);
    let mobsToRespawn = itemRespawnProcessor(roomReset[roomNames[i]].mobs, currentRoom.mobs);
    // If there are missing items, increment the resetTimer. Once it's above 3, respawn all
    // necessary items, set the timer to 0, and mark that there are no longer items to respawn.
    if (itemsToRespawn.length) {
      currentRoom.itemResetTimer++;
      if (currentRoom.itemResetTimer > 3) {
        itemsToRespawn.forEach(item => {
          currentRoom.items.push(newItem(item.category, item.name));
        });
        currentRoom.itemResetTimer = 0;
        itemsToRespawn = [];
      }
    }

    // Same logic as itemsToRespawn, but different timers and arrays need to be tracked.
    if (mobsToRespawn.length) {
      currentRoom.mobResetTimer++;
      if (currentRoom.mobResetTimer > 3) {
        mobsToRespawn.forEach(mob => {
          currentRoom.mobs.push(newMob(mob.name));
        });
        currentRoom.mobResetTimer = 0;
        mobsToRespawn = [];
      }
    }

    // If nothing needs to be respawned, take the room out of the alteredRooms array so it doesn't get checked again.
    if (!mobsToRespawn.length && !itemsToRespawn.length) alteredRooms.splice(alteredRooms.indexOf(roomNames[i]));
  }
}
