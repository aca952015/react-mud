'use strict';

export default function equipmentStatsProcessor(equipment) {
  return Object.values(equipment).reduce((acc, slot) => {
    if (slot && slot.stats.atk) acc.atk += slot.stats.atk;
    if (slot && slot.stats.mat) acc.mat += slot.stats.mat;
    if (slot && slot.stats.def) acc.def += slot.stats.def;
    if (slot && slot.stats.mdf) acc.mdf += slot.stats.mdf;
    return acc;
  }, {atk: 0, mat: 0, def: 0, mdf: 0});
}
