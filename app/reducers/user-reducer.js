'use strict';

import addToContainer from './lib/user_reducer/add-to-container.js';
import drinkPotion from './lib/user_reducer/drink-potion.js';
import dropItem from './lib/user_reducer/drop-item.js';
import getAll from './lib/user_reducer/get-all.js';
import getFromContainer from './lib/user_reducer/get-from-container.js';
import slayEnemy from './lib/user_reducer/slay-enemy.js';
import tickRegen from './lib/user_reducer/tick-regen.js';

export default function reducer(state={}, action) {
  if (action.type === 'ADD_DESCRIPTION_PARAGRAPH') {
    let description = state.description[0] === 'No description set.' ? [action.payload] : [...state.description, action.payload];
    return {...state, description};
  }
  if (action.type === 'ADD_TO_CONTAINER') return addToContainer(state, action);
  if (action.type === 'CHANGE_ROOM') return {...state, currentRoom: action.payload};
  if (action.type === 'CLEAR_DESCRIPTION') return {...state, description: ['No description set.']};
  if (action.type === 'DAMAGE_USER') return {...state, hp: state.hp - action.payload};
  if (action.type === 'DROP_ALL') return {...state, inventory: []};
  if (action.type === 'DROP_ITEM') return dropItem(state, action);
  if (action.type === 'DRINK_POTION') return drinkPotion(state, action);
  if (action.type === 'ENTER_COMBAT') return {...state, combat: {active: true, targets: [...state.combat.targets, action.payload]}};
  if (action.type === 'GET_ALL') return getAll(state, action);
  if (action.type === 'GET_FROM_CONTAINER') return getFromContainer(state, action);
  if (action.type === 'GET_ITEM' || action.type === 'QUIETLY_ADD_ITEM') return {...state, inventory: [...state.inventory, action.payload]};
  if (action.type === 'LOGIN_USER') return action.payload;
  if (action.type === 'PUT_ALL') {
    // The container's contents must be updated via concatenation and creating a copy so as to
    // not mutate state using push.
    let newContainer = action.payload.container;
    newContainer.container.contains = newContainer.container.contains.concat(action.payload.itemArray);
    return {...state, inventory: [newContainer]};
  }
  if (action.type === 'SLAY_ENEMY') return slayEnemy(state, action);
  if (action.type === 'TICK_REGEN') return tickRegen(state);
  if (action.type === 'TRUNCATE_DESCRIPTION') {
    let description = state.description.slice(0, state.description.length - 1);
    if (description.length < 1) description = ['No description set.'];
    return {...state, description};
  }
  return state;
}
