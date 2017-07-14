'use strict';

import {initialState as user} from '../data/user-initial-state.js';
import {initialState as equipment} from '../data/equipment-initial-state.js';
import {loginUser, loginEquipment, loginEffects} from '../actions/login-actions.js';
import {newMessage} from '../actions/message-actions.js';

export default function quitHandler(command, args, homeCtxProps) {
  if (homeCtxProps.combat.active) return {funcsToCall: [newMessage], feedback: 'You can\'t quit while you\'re in combat!'};

  return {
    emitType: 'quit',
    funcsToCall: [loginUser, loginEquipment, loginEffects],
    loginUser: user,
    loginEquipment: equipment,
    loginEffects: {}
  };
}
