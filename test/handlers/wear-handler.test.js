'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {wearEquipment} from '../../app/actions/item-actions.js';
import wearHandler from '../../app/handlers/wear-handler.js';
import newItem from '../../app/data/items.js';

describe('wearHandler', () => {
  const defaultObj = {funcsToCall: [newMessage]};
  const props = {
    inventory: [newItem('leather helm', 'equipment'), newItem('health potion')]
  };

  describe('With no args', () => {
    it('should return feedback of "Wear what?"', () => {
      expect(wearHandler('wear')).toEqual({
        ...defaultObj,
        feedback: 'Wear what?'
      });
    });
  });

  describe('With an item the user isn\'t carrying', () => {
    it('should return feedback of "You aren\'t carrying that."', () => {
      expect(wearHandler('wear', 'sword', null, props)).toEqual({
        ...defaultObj,
        feedback: 'You aren\'t carrying that.'
      });
    });
  });

  describe('With an item that isn\'t wearable', () => {
    it('should return feedback of "You can\'t wear that."', () => {
      expect(wearHandler('wear', 'potion', null, props)).toEqual({
        ...defaultObj,
        feedback: 'You can\'t wear that.'
      });
    });
  });
});
