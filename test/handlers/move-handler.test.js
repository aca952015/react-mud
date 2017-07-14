'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import movementHandler from '../../app/handlers/movement-handler.js';

describe('movementHandler', () => {
  let props = {
    currentRoom: 'Nexus',
    combat: {
      targets: null,
      active: false
    }
  };
  describe('With a valid exit', () => {
    it('should return a move object for the server to handle', () => {
      expect(movementHandler('down', null, props)).toEqual({
        direction: 'down',
        emitType: 'move'
      });
    });
  });

  describe('With an invalid exit', () => {
    it('should return an error object with feedback of "I don\'t see that exit here."', () => {
      expect(movementHandler('east', null, props)).toEqual({
        funcsToCall: [newMessage],
        feedback: 'I don\'t see that exit here.'
      });
    });
  });

  describe('In combat', () => {
    it('should return that the user can\'t move while in combat', () => {
      props = {
        ...props,
        combat: {
          targets: [{
            short: 'Duder'
          }],
          active: true
        }
      };

      expect(movementHandler('down', null, props)).toEqual({
        funcsToCall: [newMessage],
        feedback: `You're busy fighting ${props.combat.targets[0].short}!`});
    });
  });
});
