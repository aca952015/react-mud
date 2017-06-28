'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import lookHandler from '../../app/handlers/look-handler.js';
import newItem from '../../app/data/items.js';

describe('lookHandler', () => {
  let props = {
    inventory: [
      {
        ...newItem('backpack'),
        container: {
          contains: [newItem('health potion')]
        }
      },
      newItem('gallows key')
    ]
  };

  describe('with no args', () => {
    it('should return a look with target undefined', () => {
      expect(lookHandler('look', undefined, null, props)).toEqual({
        emitType: 'look',
        target: undefined
      });
    });
  });

  describe('With args, but not IN', () => {
    it('should return a look with target of args', () => {
      expect(lookHandler('look', 'bob', null, props)).toEqual({
        emitType: 'look',
        target: 'bob'
      });
    });
  });
});
