'use strict';

export function restoreStat(item) {
  return {
    type: 'DRINK_POTION',
    payload: {
      statToChange: item.statToChange,
      amount: item.amount
    }
  };
}
