'use strict';

import {combineReducers} from 'redux';
import user from './user-reducer.js';
import messages from './message-reducer.js';
import equipment from './equipment-reducer.js';
import login from './login-reducer.js';
import effects from './effects-reducer.js';

export default combineReducers({
  user,
  messages,
  equipment,
  login,
  effects
});
