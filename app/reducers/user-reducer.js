'use strict';

export const initialState = {
  username: `Robot_${Math.floor(Math.random() * 500 + 1)}`,
  description: 'As actual players do not exist yet, everybody is a robot. They all look the same. They all speak the same. They look just like you.',
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
  combat: {
    active: false,
    targets: []
  }
};

export default function reducer(state=initialState, action) {
  if (action.type === 'GET_ITEM' || action.type === 'QUIETLY_ADD_ITEM') return {...state, inventory: [...state.inventory, action.payload]};
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
    if (stat) {
      maxStat = `max${action.payload.statToChange.toUpperCase()}`;
      stat += action.payload.amount;
      if (stat > state[maxStat]) stat = state[maxStat];
      newState[action.payload.statToChange] = stat;
    }
    return newState;
  }
  if (action.type === 'ENTER_COMBAT') return {...state, combat: {active: true, targets: [...state.combat.targets, action.payload]}};
  if (action.type === 'SLAY_ENEMY') {
    let slainEnemy = state.combat.targets.find(enemy => enemy.id === action.payload.id);
    let prevTargets = state.combat.targets.slice(0, state.combat.targets.indexOf(slainEnemy));
    let endTargets = state.combat.targets.slice(state.combat.targets.indexOf(slainEnemy) + 1);
    let newTargets = prevTargets.concat(endTargets);
    if (!newTargets.length) return {...state, combat: {targets: [], active: false}};
    return {...state, combat: {targets: newTargets, active: true}};
  }
  if (action.type === 'DAMAGE_USER') return {...state, hp: state.hp - action.payload};
  if (action.type === 'ADD_TO_CONTAINER') {
    let tempInventory = [...state.inventory];
    let container = tempInventory.find(_container => _container === action.payload.container);
    container.container.contains.push(action.payload.item);
    tempInventory.splice(tempInventory.indexOf(action.payload.item), 1);
    return {...state, inventory: tempInventory};
  }
  if (action.type === 'GET_FROM_CONTAINER') {
    let tempInventory = [...state.inventory];
    let container = tempInventory.find(_container => _container === action.payload.container);
    container.container.contains.splice(container.container.contains.indexOf(action.payload.item), 1);
    tempInventory.push(action.payload.item);
    return {...state, inventory: tempInventory};
  }
  return state;
}
