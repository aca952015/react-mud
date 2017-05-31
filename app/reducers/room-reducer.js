'use strict';

import {roomData} from '../data/rooms.js';

export default function rooms(state=roomData, action) {
  if (action.type === 'UPDATE_ROOMS') return action.payload;
  return state;
}
