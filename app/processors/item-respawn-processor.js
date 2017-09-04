'use strict';

import newItem from '../data/items.js';

export default function itemRespawnProcessor(originalArray, currentArray) {
  const processor = {
    itemsToRespawn: [],
    itemsToRemove: []
  };

  const originalItems = originalArray.reduce((acc, item) => {
    if (acc[item.name]) acc[item.name].push(item);
    else acc[item.name] = [item];

    return acc;
  }, {});

  const currentItems = currentArray.reduce((acc, item) => {
    if (acc[item.name]) acc[item.name].push(item);
    else acc[item.name] = [item];

    return acc;
  }, {});

  for (const item in originalItems) {
    const currentItemArray = currentItems[item];
    const originalItemArray = originalItems[item];

    if (!currentItemArray) {
      for (let i = 0; i < originalItemArray.length; i++) {
        const itemToRespawn = {category: originalItems[item][i].category, name: item};
        if (originalItems[item][i].container) {
          itemToRespawn.respawnContents = originalItems[item][i].container.contains;
        }
        processor.itemsToRespawn.push(itemToRespawn);
      }
      continue;
    }

    // If there are some of an item in the room, but some are missing, check if
    // what we need to restore is a container. If so, then we need to match the
    // missing container's contents to the missing container.
    // As an example, if the room is supposed to have 3 backpacks that each hold
    // a health potion, but two of them are missing, then we need to know that
    // not only do we need to respawn 2 backpacks, but each backpack is supposed
    // to have a health potion.
    // Another example: If the room is supposed to have 3 backpacks, one holding
    // a key, one holding a health potion, and one holding a sword, and the one
    // with the health potion and the one with the sword are missing, then we
    // need to make sure we respawn two backpacks: one with a health potion and one
    // with a sword.
    // If the item isn't a container, then it's significantly simpler and we can just
    // respawn copies of each item equal to the number missing. e.g., if there are
    // supposed to be 3 leather helms, and 2 are missing, we just respawn 2 leather
    // helms.
    if (currentItemArray.length !== originalItemArray.length) {
      if (currentItemArray[0].container) {
        for (let i = 0; i < originalItemArray.length; i++) {
          for (let j = 0; j < currentItemArray.length; j++) {
            // If we find a container currently in the room that has the correct contents,
            // we mark the original array's contains as "empty" to denote that we don't
            // need to respawn it.
            if (JSON.stringify(currentItemArray[j].container.contains) === JSON.stringify(originalItemArray[i].container.contains)) {
              originalItemArray[i].containers.contains = [];
              break;
            }
          }

          // If we didn't "empty" the contents of the current item in the original array,
          // then it needs to be respawned.
          if (originalItemArray[i].containers.contains.length) {
            processor.itemsToRespawn.push({
              category: originalItems[item][i].category,
              respawnContents: originalItemArray[i].container.contains,
              name: item
            });
          }
        }
      } else {
        for (let i = 0; i < originalItemArray.length - currentItemArray.length; i++) {
          processor.itemsToRespawn.push({category: originalItems[item][i].category, name: item});
        }
      }
      continue;
    }

    // If the correct number of items exists in the room, it might still be the case
    // that container contents don't match. As an example, if there are supposed to be
    // 2 backpacks in the room, each with a health potion, and there are 2 backpacks in
    // the room, but one is missing its health potion, we need to respawn that backpack
    // with a health potion inside it. However, we also want to maintain the current
    // contents of that backpack.
    // We also need to remove the original container with missing contents so as not to create
    // duplicates.
    // As an example, if a backpack is supposed to have a health potion inside it, but it
    // has two mana potions, we want to remove that backpack, but spawn one that has two
    // mana potions and a health potion inside it.
    // This check ONLY needs to be made in the case of containers, however. The previous
    // two conditional clauses will handle all other items.
    if (currentItemArray[0].container) {
      for (let i = 0; i < originalItemArray.length; i++) {
        const itemProcessor = itemRespawnProcessor(originalItemArray[i].container.contains, currentItemArray[i].container.contains);
        itemProcessor.itemsToRespawn = itemProcessor.itemsToRespawn.map(_item => newItem(_item.category, _item.name));
        if (itemProcessor.itemsToRespawn.length) {
          processor.itemsToRespawn.push({
            category: originalItems[item][i].category,
            respawnContents: itemProcessor.itemsToRespawn.concat(currentItemArray[i].container.contains),
            name: item
          });
          processor.itemsToRemove.push({id: currentItemArray[i].id});
        }
      }
    }
  }

  return processor;
}
