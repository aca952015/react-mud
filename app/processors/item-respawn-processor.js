'use strict';

export default function itemRespawnProcessor(originalArray, currentArray) {
  // Get a count of every item that should be in the room
  const originalCounts = originalArray.reduce((acc, item) => {
    acc[item.name] = {
      count: acc[item.name] ? acc[item.name].count + 1 : 1,
      category: item.category
    };
    return acc;
  }, {});

  // Get a count of every item that's currently in the room
  const currentCounts = currentArray.reduce((acc, item) => {
    acc[item.name] = {
      count: acc[item.name] ? acc[item.name].count + 1 : 1,
      category: item.category
    };
    return acc;
  }, {});

  const itemsToRespawn = [];
  const originalKeys = Object.keys(originalCounts);

  // For each item that should be in the room, check if it currently exists in the room.
  for (let i = 0; i < originalKeys.length; i++) {
    const currentItemCounts = currentCounts[originalKeys[i]];
    const originalItemCounts = originalCounts[originalKeys[i]].count;

    // If there are currently none of the item, we need to respawn all the items originally
    // there. For example, if the room originally had 3 leather helms and now has none,
    // we need to respawn 3 leather helms.
    if (!currentItemCounts) {
      for (let j = 0; j < originalItemCounts; j++) {
        itemsToRespawn.push({category: originalCounts[originalKeys[i]].category, name: originalKeys[i]});
      }
      continue;
    }

    // If the item does exist in the room, check if the correct number of them exist.
    // If not, respawn the difference between what should be there and what is there.
    // For example, if the room originally had 3 leather helms and the room currently has 2,
    // 1 leather helm needs to be respawned.
    if (currentItemCounts.count !== originalItemCounts) {
      for (let j = 0; j < originalItemCounts - currentItemCounts.count; j++) {
        itemsToRespawn.push({category: originalCounts[originalKeys[i]].category, name: originalKeys[i]});
      }
    }
  }

  return itemsToRespawn;
}
