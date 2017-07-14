'use strict';

import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {loginUser, loginEquipment, loginEffects} from '../../app/actions/login-actions.js';
import {newMessage} from '../../app/actions/message-actions.js';
import quitHandler from '../../app/handlers/quit-handler.js';

describe('quitHandler', () => {
  describe('If the user is in combat', () => {
    it('should return an error feedback object', () => {
      expect(quitHandler('quit', undefined, {combat: {active: true}})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You can\'t quit while you\'re in combat!'
      });
    });
  });

  describe('If the user is not in combat', () => {
    it('should return a quit object', () => {
      expect(quitHandler('quit', undefined, {combat: {active: false}})).toEqual({
        emitType: 'quit',
        funcsToCall: [loginUser, loginEquipment, loginEffects],
        loginUser: user,
        loginEquipment: equipment,
        loginEffects: {}
      });
    });
  });
});
