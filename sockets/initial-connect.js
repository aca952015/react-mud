'use strict';

import {initialState as user} from '../app/data/user-initial-state.js';
import {initialState as equipment} from '../app/data/equipment-initial-state.js';

export default function initialConnect(socket) {
  socket.emit('initialConnect', {
    user: {
      ...user,
      currentRoom: 'Login Room'
    },
    equipment
  });
}
