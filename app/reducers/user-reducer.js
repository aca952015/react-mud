'use strict';

const initialState = {
  username: `Robot_${Math.floor(Math.random() * 500 + 1)}`,
  inventory: [],
  hp: 15,
  maxHP: 20,
  mp: 11,
  maxMP: 20,
  level: 1,
  str: 18,
  int: 18,
  wis: 18,
  con: 18,
  dex: 18
};

export default function reducer(state=initialState, action) {
  if (action.type === 'GET_ITEM' || action.type === 'QUIETLY_ADD_ITEM') return {...state, inventory: [...state.inventory, action.payload]};
  if (action.type === 'DROP_ITEM' || action.type === 'QUIETLY_DESTROY_ITEM') {
    let prevItems = state.inventory.slice(0, state.inventory.indexOf(action.payload));
    let endItems = state.inventory.slice(state.inventory.indexOf(action.payload) + 1);
    let newInventory = prevItems.concat(endItems);
    return {...state, inventory: newInventory};
  }
  if (action.type === 'DRINK_POTION') {
    let stat = state[action.payload.statToChange];
    let maxStat = null;
    if (stat) {
      maxStat = `max${action.payload.statToChange.toUpperCase()}`;
      stat += action.payload.amount;
      if (stat > state[maxStat]) stat = state[maxStat];
    }
    let newState = {...state};
    newState[action.payload.statToChange] = stat;
    return newState;
  }
  return state;
}
