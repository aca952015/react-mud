'use strict';

export default function dropItem(state, action) {
  const itemToDrop = state.inventory.find(item => item.id === action.payload.id);
  const prevItems = state.inventory.slice(0, state.inventory.indexOf(itemToDrop));
  const endItems = state.inventory.slice(state.inventory.indexOf(itemToDrop) + 1);
  const newInventory = prevItems.concat(endItems);
  return {...state, inventory: newInventory};
}
