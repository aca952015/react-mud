'use strict';

export function wearEquipment(eq) {
  return {
    type: 'WEAR_EQUIPMENT',
    payload: eq.equip
  };
}

export function removeItem(eq) {
  return {
    type: 'REMOVE_ITEM',
    payload: eq.removeEquip
  };
}
