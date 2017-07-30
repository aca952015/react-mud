'use strict';

export default function equipmentStatsProcessor(equipment) {
  return Object.values(equipment).reduce((acc, slot) => {
    if (slot && slot.stats.atk) acc.atk += slot.stats.atk;
    if (slot && slot.stats.mat) acc.mat += slot.stats.mat;
    return acc;
  }, {atk: 0, mat: 0});
}
