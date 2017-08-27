'use strict';

export function removeItem(eq) {
  return {
    type: 'REMOVE_ITEM',
    payload: eq.removeEquip
  };
}

export function wearEquipment(eq) {
  return {
    type: 'WEAR_EQUIPMENT',
    payload: eq.equip
  };
}
