'use strict';

export default function effectStatProcessor(effects) {
  return Object.values(effects).reduce((acc, effect) => {
    if (effect.atk) acc.atk += effect.atk;
    if (effect.mat) acc.mat += effect.mat;
    return acc;
  }, {atk: 0, mat: 0});
}
