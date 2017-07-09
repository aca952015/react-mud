'use strict';

export const initialState = {
  username: `Robot_${Math.floor(Math.random() * 500 + 1)}`,
  description: ['As actual players do not exist yet, everybody is a robot. They all look the same. They all speak the same. They look just like you.'],
  inventory: [],
  hp: 15,
  maxHP: 20,
  mp: 11,
  maxMP: 20,
  level: 1,
  atk: 2,
  def: 0,
  str: 18,
  int: 18,
  wis: 18,
  con: 18,
  dex: 18,
  currentRoom: 'Nexus',
  combat: {
    active: false,
    targets: []
  }
};

export default function reducer(state=initialState, action) {
  if (action.type === 'GET_ITEM' || action.type === 'QUIETLY_ADD_ITEM') return {...state, inventory: [...state.inventory, action.payload]};
  if (action.type === 'GET_ALL') {
    // The existence of action.container is how we know if the user was getting items
    // from a container they're carrying or a container in the room. If it's from a
    // container they're carrying, then the container's contents need to be updated
    // appropriately. However, we can't splice the contains array because it would
    // mutate state. Instead, we individually slice out each item that needs to be
    // removed and continually concatenate the results together.
    // It's a very slow time complexity, but it does properly update a container's
    // contents without mutating state.
    if (action.container) {
      let newContainer = action.container;
      action.payload.forEach(item => {
        let prevItems = action.container.container.contains.slice(0, action.container.container.contains.indexOf(item));
        let endItems = action.container.container.contains.slice(action.container.container.contains.indexOf(item) + 1);
        let newContains = prevItems.concat(endItems);
        newContainer.container.contains = newContains;
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
  if (action.type === 'PUT_ALL') {
    // The container's contents must be updated via concatenation and creating a copy so as to
    // not mutate state using push.
    let newContainer = action.payload.container;
    newContainer.container.contains = newContainer.container.contains.concat(action.payload.itemArray);
    return {...state, inventory: [newContainer]};
  }
  if (action.type === 'DROP_ALL') return {...state, inventory: []};
  if (action.type === 'DROP_ITEM') {
    let itemToDrop = state.inventory.find(item => item.id === action.payload.id);
    let prevItems = state.inventory.slice(0, state.inventory.indexOf(itemToDrop));
    let endItems = state.inventory.slice(state.inventory.indexOf(itemToDrop) + 1);
    let newInventory = prevItems.concat(endItems);
    return {...state, inventory: newInventory};
  }
  if (action.type === 'DRINK_POTION') {
    let newState = {...state};
    let stat = state[action.payload.statToChange];
    let maxStat = null;
    if (stat) { // In the future, potions might not affect stats
      maxStat = `max${action.payload.statToChange.toUpperCase()}`;
      stat += action.payload.amount;
      // If the restoration goes over the max, set the current to the max.
      // For example, 15/20 HP plus 10 HP should be 20/20 HP, not 25/20.
      if (stat > state[maxStat]) stat = state[maxStat];
      newState[action.payload.statToChange] = stat;
    }
    return newState;
  }
  if (action.type === 'ENTER_COMBAT') return {...state, combat: {active: true, targets: [...state.combat.targets, action.payload]}};
  if (action.type === 'SLAY_ENEMY') {
    // Remove the enemy from the current combat array. If they are the last enemy,
    // remove the user from combat.
    let slainEnemy = state.combat.targets.find(enemy => enemy.id === action.payload.id);
    let prevTargets = state.combat.targets.slice(0, state.combat.targets.indexOf(slainEnemy));
    let endTargets = state.combat.targets.slice(state.combat.targets.indexOf(slainEnemy) + 1);
    let newTargets = prevTargets.concat(endTargets);
    if (!newTargets.length) return {...state, combat: {targets: [], active: false}};
    return {...state, combat: {targets: newTargets, active: true}};
  }
  if (action.type === 'DAMAGE_USER') return {...state, hp: state.hp - action.payload};
  if (action.type === 'ADD_TO_CONTAINER') {
    // To prevent mutation, create a copy of state.inventory instead of a reference.
    const tempInventory = state.inventory.concat();
    const containerIndex = state.inventory.indexOf(action.payload.container);

    // Create a copy of the container using .concat and add the item into the container's contents.
    let newContainer = action.payload.container;
    newContainer.container.contains = newContainer.container.contains.concat(action.payload.item);

    // Replace the old container with the new container.
    // Since tempInventory is a copy, we can safely mutate it and splice out the item from the inventory.
    tempInventory[containerIndex] = newContainer;
    tempInventory.splice(tempInventory.indexOf(action.payload.item), 1);
    return {...state, inventory: tempInventory};
  }
  if (action.type === 'GET_FROM_CONTAINER') {
    // To prevent mutation, create a copy of state.inventory instead of a reference.
    const tempInventory = state.inventory.concat();
    const containerIndex = state.inventory.indexOf(action.payload.container);

    // Get copies of all the items before the item to splice and all the items after the item to splice
    // Then make the contents of the container a new array using concat, to prevent mutation of state.
    let newContainer = action.payload.container;
    let prevItems = newContainer.container.contains.slice(0, newContainer.container.contains.indexOf(action.payload.item));
    let endItems = newContainer.container.contains.slice(newContainer.container.contains.indexOf(action.payload.item) + 1);
    newContainer.container.contains = prevItems.concat(endItems);
    tempInventory[containerIndex] = newContainer;
    tempInventory.push(action.payload.item);
    return {...state, inventory: tempInventory};
  }
  if (action.type === 'CHANGE_ROOM') return {...state, currentRoom: action.payload};
  return state;
}
