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
      newItem('gallows key'),
      {
        ...newItem('backpack'),
        container: {
          contains: [newItem('health potion')]
        }
      }
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

  describe('With args and with IN', () => {
    describe('Targeting an item the user is carrying', () => {
      describe('That is not a container', () => {
        it('should return feedback that it isn\'t a container', () => {
          expect(lookHandler('look', 'in key', null, props)).toEqual({
            funcsToCall: [newMessage],
            feedback: 'That isn\'t a container.'
          });
        });
      });

      describe('With dot notation', () => {
        it('should return a newMessage with containedItems', () => {
          expect(lookHandler('look', 'in 2.backpack', null, props)).toEqual({
            funcsToCall: [newMessage],
            containedItems: props.inventory[2].container.contains
          });
        });
      });
    });
  });
});
