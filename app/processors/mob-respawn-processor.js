'use strict';

export default function mobRespawnProcessor(originalArray, currentArray) {
  const originalCounts = originalArray.reduce((acc, mob) => {
    acc[mob.name] = {count: acc[mob.name] ? acc[mob.name].count + 1 : 1};
    return acc;
  }, {});

  const currentCounts = currentArray.reduce((acc, mob) => {
    acc[mob.name] = {count: acc[mob.name] ? acc[mob.name].count + 1 : 1};
    return acc;
  }, {});

  const mobsToRespawn = [];

  for (const mob in originalCounts) {
    const currentMobCounts = currentCounts[mob];
    const originalMobCounts = originalCounts[mob].count;

    // If there are currently none of the mob, we need to respawn all the mobs originally
    // there. For example, if the room originally had 3 bats and now has none,
    // we need to respawn 3 bats.
    if (!currentMobCounts) {
      for (let i = 0; i < originalMobCounts; i++) {
        mobsToRespawn.push({name: mob});
      }
      continue;
    }

    // If the mob does exist in the room, check if the correct number of them exist.
    // If not, respawn the difference between what should be there and what is there.
    // For example, if the room originally had 3 bats and the room currently has 2,
    // 1 bat needs to be respawned.
    if (currentMobCounts.count !== originalMobCounts) {
      for (let i = 0; i < originalMobCounts - currentMobCounts.count; i++) {
        mobsToRespawn.push({name: mob});
      }
    }
  }

  return mobsToRespawn;
}
