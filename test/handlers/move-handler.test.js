'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import movementHandler from '../../app/handlers/movement-handler.js';

describe('movementHandler', () => {
  describe('With a valid exit', () => {
    it('should return a move object for the server to handle', () => {
      expect(movementHandler('down', null, {currentRoom: 'Nexus'})).toEqual({
        direction: 'down',
        emitType: 'move'
      });
    });
  });

  describe('With an invalid exit', () => {
    it('should return an error object with feedback of "I don\'t see that exit here."', () => {
      expect(movementHandler('east', null, {currentRoom: 'Nexus'})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'I don\'t see that exit here.'
      });
    });
  });
});
