'use strict';

export default function itemRespawnProcessor(originalArray, currentArray) {
  // Get a count of every item or mob that should be in the room
  // Since items have a category, but mobs do not, account for that
  const originalCounts = originalArray.reduce((acc, item) => {
    acc[item.name] = {
      count: acc[item.name] ? acc[item.name].count + 1 : 1,
      category: item.category ? item.category : null
    };
    return acc;
  }, {});

  // Get a count of every item or mob that's currently in the room
  // Since items have a category, but mobs do not, account for that
  const currentCounts = currentArray.reduce((acc, item) => {
    acc[item.name] = {
      count: acc[item.name] ? acc[item.name].count + 1 : 1,
      category: item.category ? item.category : null
    };
    return acc;
  }, {});

  const itemsToRespawn = [];

  // For each item that should be in the room, check if it currently exists in the room.
  for (const item in originalCounts) {
    const currentItemCounts = currentCounts[item];
    const originalItemCounts = originalCounts[item].count;

    // If there are currently none of the item, we need to respawn all the items originally
    // there. For example, if the room originally had 3 leather helms and now has none,
    // we need to respawn 3 leather helms.
    if (!currentItemCounts) {
      for (let i = 0; i < originalItemCounts; i++) {
        if (originalCounts[item].category) itemsToRespawn.push({category: originalCounts[item].category, name: item});
        else itemsToRespawn.push({name: item});
      }
      continue;
    }

    // If the item does exist in the room, check if the correct number of them exist.
    // If not, respawn the difference between what should be there and what is there.
    // For example, if the room originally had 3 leather helms and the room currently has 2,
    // 1 leather helm needs to be respawned.
    if (currentItemCounts.count !== originalItemCounts) {
      for (let i = 0; i < originalItemCounts - currentItemCounts.count; i++) {
        if (originalCounts[item].category) itemsToRespawn.push({category: originalCounts[item].category, name: item});
        else itemsToRespawn.push({name: item});
      }
    }
  }

  return itemsToRespawn;
}
