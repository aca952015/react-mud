'use strict';

const initialState = {
  username: `Robot_${Math.floor(Math.random() * 500 + 1)}`,
  description: 'As actual players do not exist yet, everybody is a robot. They all look the same. They all speak the same. They look just like you.',
  inventory: [],
  hp: 15,
  maxHP: 20,
  mp: 11,
  maxMP: 20,
  level: 1,
  atk: 2,
  str: 18,
  int: 18,
  wis: 18,
  con: 18,
  dex: 18,
  combat: {
    active: false,
    target: null
  }
};

export default function reducer(state=initialState, action) {
  if (action.type === 'GET_ITEM' || action.type === 'QUIETLY_ADD_ITEM') return {...state, inventory: [...state.inventory, action.payload]};
  if (action.type === 'DROP_ITEM') {
    let prevItems = state.inventory.slice(0, state.inventory.indexOf(action.payload));
    let endItems = state.inventory.slice(state.inventory.indexOf(action.payload) + 1);
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
  if (action.type === 'ENTER_COMBAT') return {...state, combat: {active: true, target: action.payload}};
  if (action.type === 'DAMAGE_USER') return {...state, hp: state.hp - action.payload};
  if (action.type === 'END_COMBAT') return {...state, combat: {active: false, target: null}};
  return state;
}
