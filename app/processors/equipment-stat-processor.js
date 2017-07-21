'use strict';

export default function equipmentStatsProcessor(equipment) {
  const equipmentAtk = Object.keys(equipment).reduce((acc, slot) => {
    if (equipment[slot] && equipment[slot].stats.atk) acc += equipment[slot].stats.atk;
    return acc;
  }, 0);

  // Calculate the amount of MAT bonuses from currently equipped items
  const equipmentMat = Object.keys(equipment).reduce((acc, slot) => {
    if (equipment[slot] && equipment[slot].stats.mat) acc += equipment[slot].stats.mat;
    return acc;
  }, 0);

  return {atk: equipmentAtk, mat: equipmentMat};
}
