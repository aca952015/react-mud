'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {roomData} from '../../app/data/rooms.js';
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
});
