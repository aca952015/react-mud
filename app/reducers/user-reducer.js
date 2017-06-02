'use strict';

const initialState = {
  username: `Robot_${Math.floor(Math.random() * 500 + 1)}`,
  password: '',
  inventory: []
};

export default function reducer(state=initialState, action) {
  if (action.type === 'GET_ITEM') return {...state, inventory: [...state.inventory, action.payload]};
  if (action.type === 'DROP_ITEM') return {...state, inventory: state.inventory.filter(ele => ele.name !== action.payload.item.name)};
  return state;
}
