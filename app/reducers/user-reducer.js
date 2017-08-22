'use strict';

import addToContainer from './lib/user_reducer/add-to-container.js';
import changeStat from './lib/user_reducer/change-stat.js';
import dropItem from './lib/user_reducer/drop-item.js';
import getAll from './lib/user_reducer/get-all.js';
import getFromContainer from './lib/user_reducer/get-from-container.js';
import slayEnemy from './lib/user_reducer/slay-enemy.js';
import tickRegen from './lib/user_reducer/tick-regen.js';

export default function reducer(state={}, action) {
  switch(action.type) {
    case 'ADD_DESCRIPTION_PARAGRAPH': {
      const description = state.description[0] === 'No description set.' ? [action.payload] : [...state.description, action.payload];
      return {...state, description};
    }
    case 'ADD_TO_CONTAINER': return addToContainer(state, action);
    case 'CHANGE_ROOM': return {...state, currentRoom: action.payload};
    case 'CHANGE_STAT': return changeStat(state, action);
    case 'CLEAR_DESCRIPTION': return {...state, description: ['No description set.']};
    case 'DROP_ALL': return {...state, inventory: []};
    case 'DROP_ITEM': return dropItem(state, action);
    case 'ENTER_COMBAT': return {...state, combat: {active: true, targets: [...state.combat.targets, action.payload]}};
    case 'ESCAPE_COMBAT': return {...state, combat: {active: false, targets: []}};
    case 'FULL_RESTORE': return {...state, hp: state.maxHP, mp: state.maxMP};
    case 'GET_ALL': return getAll(state, action);
    case 'GET_FROM_CONTAINER': return getFromContainer(state, action);
    case 'GET_ITEM': return {...state, inventory: [...state.inventory, action.payload]};
    case 'LOGIN_USER': return action.payload;
    case 'PUT_ALL': {
      // The container's contents must be updated via concatenation and creating a copy so as to
      // not mutate state using push.
      const newContainer = action.payload.container;
      newContainer.container.contains = newContainer.container.contains.concat(action.payload.itemArray);
      return {...state, inventory: [newContainer]};
    }
    case 'QUIETLY_ADD_ITEM': return {...state, inventory: [...state.inventory, action.payload]};
    case 'SLAY_ENEMY': return slayEnemy(state, action);
    case 'TICK_REGEN': return tickRegen(state);
    case 'TRUNCATE_DESCRIPTION': {
      let description = state.description.slice(0, state.description.length - 1);
      if (description.length < 1) description = ['No description set.'];
      return {...state, description};
    }
    default: return state;
  }
}
