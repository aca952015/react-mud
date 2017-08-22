'use strict';

export default function getAll(state, action) {
  // The existence of action.container is how we know if the user was getting items
  // from a container they're carrying or a container in the room. If it's from a
  // container they're carrying, then the container's contents need to be updated
  // appropriately. However, we can't splice the contains array because it would
  // mutate state. Instead, we individually slice out each item that needs to be
  // removed and continually concatenate the results together.
  // It's a very slow time complexity, but it does properly update a container's
  // contents without mutating state.
  if (action.container) {
    const newContainer = action.container;
    action.payload.forEach(item => {
      const prevItems = action.container.container.contains.slice(0, action.container.container.contains.indexOf(item));
      const endItems = action.container.container.contains.slice(action.container.container.contains.indexOf(item) + 1);
      newContainer.container.contains = prevItems.concat(endItems);
    });
    let newInventory = state.inventory;
    newInventory[state.inventory.indexOf(state.inventory.find(container => container.id === newContainer.id))] = newContainer;
    newInventory = newInventory.concat(action.payload);
    return {...state, inventory: newInventory};
  }
  // If the user is GETTING ALL from a container in the room, just concatenate the items
  // into the user's inventory.
  return {...state, inventory: state.inventory.concat(action.payload)};
}
