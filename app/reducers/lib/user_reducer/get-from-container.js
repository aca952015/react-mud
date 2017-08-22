'use strict';

export default function getFromContainer(state, action) {
  // To prevent mutation, create a copy of state.inventory instead of a reference.
  const tempInventory = state.inventory.concat();
  const containerIndex = state.inventory.indexOf(action.payload.container);

  // Get copies of all the items before the item to splice and all the items after the item to splice
  // Then make the contents of the container a new array using concat, to prevent mutation of state.
  const newContainer = action.payload.container;
  const prevItems = newContainer.container.contains.slice(0, newContainer.container.contains.indexOf(action.payload.item));
  const endItems = newContainer.container.contains.slice(newContainer.container.contains.indexOf(action.payload.item) + 1);
  newContainer.container.contains = prevItems.concat(endItems);
  tempInventory[containerIndex] = newContainer;
  tempInventory.push(action.payload.item);
  return {...state, inventory: tempInventory};
}
