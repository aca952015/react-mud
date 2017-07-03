'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {getFromContainer} from '../../app/actions/inventory-actions.js';
import getHandler from '../../app/handlers/get-handler.js';
import newItem from '../../app/data/items.js';

describe('getHandler', () => {
  let backpack1 = newItem('containers', 'backpack');
  backpack1.container.contains.push(newItem('potions', 'health potion'));
  backpack1.container.contains.push(newItem('potions', 'health potion'));
  backpack1.container.contains.push(newItem('containers', 'corpse'));

  let backpack2 = newItem('containers', 'backpack');
  backpack2.container.contains.push(newItem('potions', 'health potion'));
  backpack2.container.contains.push(newItem('potions', 'health potion'));

  let props = {inventory: [backpack1, backpack2, newItem('keys', 'gallows key')]};
  describe('With no args', () => {
    it('should return an error object with feedback "Get what?"', () => {
      expect(getHandler('get')).toEqual({funcsToCall: [newMessage], feedback: 'Get what?'});
    });
  });


  describe('With args', () => {
    describe('With no optional container arg', () => {
      it('should return a proper emit object to be handled by the server', () => {
        expect(getHandler('get', 'potion')).toEqual({emitType: 'pickUpItem', item: 'potion'});
      });
    });

    describe('With optional container arg', () => {
      describe('With an item the user is carrying', () => {
        describe('On an item that isn\'t a valid pickup type', () => {
          it('should inform the user they can\'t pick it up', () => {
            expect(getHandler('get', 'corpse backpack', props)).toEqual({
              funcsToCall: [newMessage],
              feedback: 'You can\'t pick that up.'
            });
          });
        });
        describe('That isn\'t a container', () => {
          it('should inform the user it isn\'t a container', () => {
            expect(getHandler('get', 'potion key', props)).toEqual({
              funcsToCall: [newMessage],
              feedback: 'That isn\'t a container.'
            });
          });
        });

        describe('That is a container', () => {
          describe('That doesn\'t hold the designated item', () => {
            it('should inform the user that that item isn\'t seen', () => {
              expect(getHandler('get', 'sword backpack', props)).toEqual({
                funcsToCall: [newMessage],
                feedback: 'I don\'t see that item in that container.'
              });
            });
          });

          describe('That does hold the designated item', () => {
            describe('With mixed case', () => {
              it('should return a getFromContainer object with newMessage and getFromContainer funcsToCall', () => {
                expect(getHandler('get', '2.PotIoN BaCKPaCk', props)).toEqual({
                  emitType: 'pickedFromInventory',
                  funcsToCall: [newMessage, getFromContainer],
                  item: props.inventory[0].container.contains[1],
                  container: props.inventory[0],
                  feedback: `You get ${props.inventory[0].container.contains[1].short} from ${props.inventory[0].short}.`
                });
              });
            });

            describe('With dot notation on the item, but not the container', () => {
              describe('With full terms', () => {
                it('should return a getFromContainer object with newMessage and getFromContainer funcsToCall', () => {
                  expect(getHandler('get', '2.potion backpack', props)).toEqual({
                    emitType: 'pickedFromInventory',
                    funcsToCall: [newMessage, getFromContainer],
                    item: props.inventory[0].container.contains[1],
                    container: props.inventory[0],
                    feedback: `You get ${props.inventory[0].container.contains[1].short} from ${props.inventory[0].short}.`
                  });
                });
              });

              describe('With fuzzy matching', () => {
                it('should return a getFromContainer object with newMessage and getFromContainer funcsToCall', () => {
                  expect(getHandler('get', '2.po bac', props)).toEqual({
                    emitType: 'pickedFromInventory',
                    funcsToCall: [newMessage, getFromContainer],
                    item: props.inventory[0].container.contains[1],
                    container: props.inventory[0],
                    feedback: `You get ${props.inventory[0].container.contains[1].short} from ${props.inventory[0].short}.`
                  });
                });
              });
            });

            describe('With dot notation on the item and container', () => {
              it('should return a getFromContainer object with newMessage and getFromContainer funcsToCall', () => {
                expect(getHandler('get', '2.potion 2.backpack', props)).toEqual({
                  emitType: 'pickedFromInventory',
                  funcsToCall: [newMessage, getFromContainer],
                  item: props.inventory[1].container.contains[1],
                  container: props.inventory[1],
                  feedback: `You get ${props.inventory[1].container.contains[1].short} from ${props.inventory[1].short}.`
                });
              });
            });

            describe('With dot notation on the container, but not the item', () => {
              it('should return a getFromContainer object with newMessage and getFromContainer funcsToCall', () => {
                expect(getHandler('get', 'potion 2.backpack', props)).toEqual({
                  emitType: 'pickedFromInventory',
                  funcsToCall: [newMessage, getFromContainer],
                  item: props.inventory[1].container.contains[0],
                  container: props.inventory[1],
                  feedback: `You get ${props.inventory[1].container.contains[0].short} from ${props.inventory[1].short}.`
                });
              });
            });

            describe('With normal targeting on both', () => {
              it('should return a getFromContainer object with newMessage and getFromContainer funcsToCall', () => {
                expect(getHandler('get', 'potion backpack', props)).toEqual({
                  emitType: 'pickedFromInventory',
                  funcsToCall: [newMessage, getFromContainer],
                  item: props.inventory[0].container.contains[0],
                  container: props.inventory[0],
                  feedback: `You get ${props.inventory[0].container.contains[0].short} from ${props.inventory[0].short}.`
                });
              });
            });
          });
        });
      });

      describe('With an item the user isn\'t carrying', () => {
        it('should return a getFromContainer emit event', () => {
          expect(getHandler('get', 'potion satchel', props)).toEqual({
            emitType: 'getFromContainer',
            item: 'potion',
            container: 'satchel'
          });
        });
      });

      describe('With optional FROM clause', () => {
        it('should return a getFromContainer emit event', () => {
          expect(getHandler('get', 'potion from satchel', props)).toEqual({
            emitType: 'getFromContainer',
            item: 'potion',
            container: 'satchel'
          });
        });
      });
    });
  });
});
