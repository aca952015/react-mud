'use strict';

export default function dropItem(state, action) {
  let itemToDrop = state.inventory.find(item => item.id === action.payload.id);
  let prevItems = state.inventory.slice(0, state.inventory.indexOf(itemToDrop));
  let endItems = state.inventory.slice(state.inventory.indexOf(itemToDrop) + 1);
  let newInventory = prevItems.concat(endItems);
  return {...state, inventory: newInventory};
}
