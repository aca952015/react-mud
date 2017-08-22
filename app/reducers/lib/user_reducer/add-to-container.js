'use strict';

export default function addToContainer(state, action) {
  // To prevent mutation, create a copy of state.inventory instead of a reference.
  const tempInventory = state.inventory.concat();
  const containerIndex = state.inventory.indexOf(action.payload.container);

  // Create a copy of the container using .concat and add the item into the container's contents.
  const newContainer = action.payload.container;
  newContainer.container.contains = newContainer.container.contains.concat(action.payload.item);

  // Replace the old container with the new container.
  // Since tempInventory is a copy, we can safely mutate it and splice out the item from the inventory.
  tempInventory[containerIndex] = newContainer;
  tempInventory.splice(tempInventory.indexOf(action.payload.item), 1);
  return {...state, inventory: tempInventory};
}
