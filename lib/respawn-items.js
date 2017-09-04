'use strict';

import itemRespawnProcessor from '../app/processors/item-respawn-processor.js';
import lockedExitProcessor from '../app/processors/locked-exit-processor.js';
import newItem from '../app/data/items.js';
import newMob from '../app/data/mobs.js';

export default function respawnItems(roomData, roomReset, alteredRooms) {
  for (let i = 0; i < alteredRooms.length; i++) {
    const currentRoom = roomData[alteredRooms[i]];
    let itemsToRespawn = itemRespawnProcessor(roomReset[alteredRooms[i]].items, currentRoom.items);
    let mobsToRespawn = itemRespawnProcessor(roomReset[alteredRooms[i]].mobs, currentRoom.mobs);
    let exitsToLock = lockedExitProcessor(currentRoom.exits);

    // If there are missing items, increment the resetTimer. Once it's above 3, respawn all
    // necessary items, set the timer to 0, and mark that there are no longer items to respawn.
    if (itemsToRespawn.length) {
      currentRoom.itemResetTimer++;
      if (currentRoom.itemResetTimer > 3) {
        itemsToRespawn.forEach(item => currentRoom.items.push(newItem(item.category, item.name)));
        currentRoom.itemResetTimer = 0;
        itemsToRespawn = [];
      }
    }

    // Same logic as itemsToRespawn, but different timers and arrays need to be tracked.
    if (mobsToRespawn.length) {
      currentRoom.mobResetTimer++;
      if (currentRoom.mobResetTimer > 3) {
        mobsToRespawn.forEach(mob => currentRoom.mobs.push(newMob(mob.name)));
        currentRoom.mobResetTimer = 0;
        mobsToRespawn = [];
      }
    }

    // Similar logic as itemsToRespawn, but different timers and data need to be tracked.
    if (exitsToLock.length) {
      currentRoom.lockedExitTimer++;
      if (currentRoom.lockedExitTimer > 3) {
        exitsToLock.forEach(exit => {
          currentRoom.exits[exit.directionToLock].locked = true;
          exit.oppositeExit.locked = true;
        });
        exitsToLock = [];
        currentRoom.lockedExitTimer = 0;
      }
    }

    // If nothing needs to be reset, take the room out of the alteredRooms array so it doesn't get checked again.
    if (!mobsToRespawn.length && !itemsToRespawn.length && !exitsToLock.length) {
      alteredRooms.splice(alteredRooms.indexOf(alteredRooms[i]), 1);
    }
  }
}
