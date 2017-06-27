'use strict';

import {addToContainer} from '../../app/actions/inventory-actions.js';
import {newMessage} from '../../app/actions/message-actions.js';
import newItem from '../../app/data/items.js';
import putHandler from '../../app/handlers/put-handler.js';

describe('putHandler', () => {
  let defaultObj = {funcsToCall: [newMessage]};
  let props = {inventory: [newItem('health potion'), newItem('health potion'), newItem('backpack')]};

  describe('With too few arguments', () => {
    it('should return feedback with a syntax error', () => {
      expect(putHandler('put', 'potion', null, props)).toEqual({
        ...defaultObj,
        feedback: 'Put what where? (format: PUT <item> <target> or PUT <item> IN <target>)'
      });
    });
  });

  describe('With an item the user isn\'t carrying', () => {
    it('should return feedback that they aren\'t carrying it', () => {
      expect(putHandler('put', 'bob backpack', null, props)).toEqual({
        ...defaultObj,
        feedback: 'You don\'t seem to be carrying that.'
      });
    });
  });
});
