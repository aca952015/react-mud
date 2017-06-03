'use strict';

const initialState = {
  username: `Robot_${Math.floor(Math.random() * 500 + 1)}`,
  password: '',
  inventory: []
};

export default function reducer(state=initialState, action) {
  if (action.type === 'GET_ITEM') return {...state, inventory: [...state.inventory, action.payload]};
  if (action.type === 'DROP_ITEM') {
    let prevItems = state.inventory.slice(0, state.inventory.indexOf(action.payload.item));
    let endItems = state.inventory.slice(state.inventory.indexOf(action.payload.item) + 1);
    let newInventory = prevItems.concat(endItems);
    return {...state, inventory: newInventory};
  }
  return state;
}
