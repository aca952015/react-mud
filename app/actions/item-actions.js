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

export function wearEquipment(eq) {
  return {
    type: 'WEAR_EQUIPMENT',
    payload: eq.equip
  };
}
