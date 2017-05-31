'use strict';

import {combineReducers} from 'redux';
import user from './user-reducer.js';
import messages from './message-reducer.js';
import rooms from './room-reducer.js';

export default combineReducers({
  user,
  messages,
  rooms
});
