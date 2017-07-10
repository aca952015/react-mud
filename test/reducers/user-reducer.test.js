'use strict';

import reducer, {initialState} from '../lib/user-initial-state.js';
import newItem from '../../app/data/items.js';

describe('user reducer', () => {
  it('should return the initialState with no information', () => {
    let tempReducer = reducer(undefined, {});
    tempReducer.username = initialState.username;
    expect(tempReducer).toEqual(initialState);
  });

  describe('With a GET_ITEM action', () => {
    it('should update the inventory with the payload', () => {
      expect(reducer(initialState, {type: 'GET_ITEM', payload: 'some item'})).toEqual({
        ...initialState,
        inventory: ['some item']
      });
    });
  });

  describe('With a TRUNCATE_DESCRIPTION action', () => {
    describe('With a one-paragraph description set', () => {
      it('should update the description to "No description set."', () => {
        expect(reducer(initialState, {type: 'TRUNCATE_DESCRIPTION'})).toEqual({
          ...initialState,
          description: ['No description set.']
        });
      });
    });

    describe('With a multi-paragraph descripiton set', () => {
      it('should update the description to be one less paragraph', () => {
        expect(reducer({...initialState, description: ['Desc1', 'Desc2']}, {type: 'TRUNCATE_DESCRIPTION'})).toEqual({
          ...initialState,
          description: ['Desc1']
        });
      });
    });
  });

  describe('With a CLEAR_DESCRIPTION action', () => {
    it('should set the description to "No description set."', () => {
      expect(reducer(initialState, {type: 'CLEAR_DESCRIPTION'})).toEqual({
        ...initialState,
        description: ['No description set.']
      });
    });
  });

  describe('With a ADD_DESCRIPTION_PARAGRAPH action', () => {
    describe('If the description is "No description set."', () => {
      it('should overwrite the description with the payload', () => {
        expect(reducer({...initialState, description: ['No description set.']}, {type: 'ADD_DESCRIPTION_PARAGRAPH', payload: 'Desc1'})).toEqual({
          ...initialState,
          description: ['Desc1']
        });
      });
    });

    describe('If there is a description in place', () => {
      it('should add a new paragraph to the description', () => {
        expect(reducer(initialState, {type: 'ADD_DESCRIPTION_PARAGRAPH', payload: 'Desc1'})).toEqual({
          ...initialState,
          description: [...initialState.description, 'Desc1']
        });
      });
    });
  });

  describe('With a QUIETLY_ADD_ITEM action', () => {
    it('should update the inventory with the payload', () => {
      expect(reducer(initialState, {type: 'GET_ITEM', payload: 'some item'})).toEqual({
        ...initialState,
        inventory: ['some item']
      });
    });
  });

  describe('With a DROP_ITEM action', () => {
    let tempInventory = ['item1', 'item2', 'item1'];
    it('should splice the item out of the inventory', () => {
      expect(reducer({...initialState, inventory: tempInventory}, {type: 'DROP_ITEM', payload: 'item1'})).toEqual({
        ...initialState,
        inventory: ['item2', 'item1']
      });
    });
  });

  describe('With a DRINK_POTION action and a valid stat', () => {
    it('should update the user\'s appropriate stat with the payload\'s amount', () => {
      expect(reducer(initialState, {type: 'DRINK_POTION', payload: {statToChange: 'hp', amount: 10}})).toEqual({
        ...initialState,
        hp: 20
      });
    });
  });

  describe('With a DRINK_POTION action and no stat to change', () => {
    it('should just return the initialState', () => {
      expect(reducer(initialState, {type: 'DRINK_POTION', payload: {effect: 'buff'}})).toEqual(initialState);
    });
  });

  describe('With an ENTER_COMBAT action', () => {
    it('should return a new combat object with active true and the targets array updated', () => {
      expect(reducer(initialState, {type: 'ENTER_COMBAT', payload: 'Some test target'})).toEqual({
        ...initialState,
        combat: {
          active: true,
          targets: ['Some test target']
        }
      });
    });
  });

  describe('SLAY_ENEMY', () => {
    describe('If it\'s the last enemy', () => {
      it('should remove that enemy from the targets array and change combat to false', () => {
        expect(reducer({
          ...initialState,
          combat: {
            active: true,
            targets: [{id: 1}]
          }
        }, {type: 'SLAY_ENEMY', payload: {id: 1}})).toEqual(initialState);
      });
    });

    describe('If it isn\'t the last enemy', () => {
      it('should remove that enemy from the targets array, but keep combat active', () => {
        expect(reducer({
          ...initialState,
          combat: {
            active: true,
            targets: [{id: 1}, {id: 2}]
          }
        }, {type: 'SLAY_ENEMY', payload: {id:1}}))
        .toEqual({
          ...initialState,
          combat: {
            active: true,
            targets: [{id: 2}]
          }
        });
      });
    });
  });

  describe('DAMAGE_USER', () => {
    it('should reduce the user\'s HP by the damage in the payload', () => {
      expect(reducer(initialState, {type: 'DAMAGE_USER', payload: 2})).toEqual({...initialState, hp: 13});
    });
  });

  describe('ADD_TO_CONTAINER', () => {
    it('should add an item to the correct container', () => {
      let potion = newItem('potions', 'health potion');
      let backpack = newItem('containers', 'backpack');
      expect(reducer(
        {
          ...initialState,
          inventory: [potion, backpack]
        },
        {
          type: 'ADD_TO_CONTAINER',
          payload: {
            item: potion,
            container: backpack
          }
        }
      )).toEqual({
        ...initialState,
        inventory: [{
          ...backpack,
          container: {
            holds: [...backpack.container.holds],
            contains: [potion]
          }
        }]
      });
    });
  });

  describe('GET_FROM_CONTAINER', () => {
    it('should add an item to the inventory from a container', () => {
      let potion = newItem('potions', 'health potion');
      let backpack = newItem('containers', 'backpack');
      backpack.container.contains.push(potion);
      expect(reducer(
        {
          ...initialState,
          inventory: [backpack]
        },
        {
          type: 'GET_FROM_CONTAINER',
          payload: {
            item: potion,
            container: backpack
          }
        }
      )).toEqual({
        ...initialState,
        inventory: [
          {
            ...backpack,
            container: {
              holds: [...backpack.container.holds],
              contains: []
            }
          },
          potion
        ]
      });
    });
  });

  describe('CHANGE_ROOM', () => {
    it('should change the currentRoom property to the payload', () => {
      expect(reducer(initialState, {type: 'CHANGE_ROOM', payload: 'Town Square'})).toEqual({
        ...initialState,
        currentRoom: 'Town Square'
      });
    });
  });

  describe('GET_ALL', () => {
    describe('From the room or the contents of a container in the room', () => {
      it('should concatenate the current inventory with the item array from the payload', () => {
        let potion = newItem('potions', 'health potion');
        let key = newItem('keys', 'gallows key');
        let backpack = newItem('containers', 'backpack');
        expect(reducer({...initialState, inventory: [potion]}, {type: 'GET_ALL', payload: [key, backpack]})).toEqual({
          ...initialState,
          inventory: [potion, key, backpack]
        });
      });
    });

    describe('From a container the user is carrying', () => {
      let potion = newItem('potions', 'health potion');
      let manaPotion = newItem('potions', 'mana potion');
      let key = newItem('keys', 'gallows key');
      let backpack = newItem('containers', 'backpack');
      backpack.container.contains.push(key);
      backpack.container.contains.push(potion);
      expect(reducer({...initialState, inventory: [manaPotion, backpack]}, {type: 'GET_ALL', payload: [key, potion], container: backpack})).toEqual({
        ...initialState,
        inventory: [manaPotion, {...backpack, container: {contains: [], holds: [...backpack.container.holds]}}, key, potion]
      });
    });
  });

  describe('PUT_ALL', () => {
    it('should put everything in the user\'s inventory into the specified container', () => {
      let backpack = newItem('containers', 'backpack');
      let manaPotion = newItem('potions', 'mana potion');
      let key = newItem('keys', 'gallows key');
      let potion = newItem('potions', 'health potion');
      backpack.container.contains.push(manaPotion);

      expect(reducer(
        {
          ...initialState,
          inventory: [backpack, key, potion]
        },
        {
          type: 'PUT_ALL',
          payload: {
            itemArray: [key, potion],
            container: backpack
          }
        }
      )).toEqual({
        ...initialState,
        inventory: [{
          ...backpack,
          container: {
            contains: [manaPotion, key, potion],
            holds: [...backpack.container.holds]
          }
        }]
      });
    });
  });

  describe('DROP_ALL', () => {
    it('should change the user\'s inventory to an empty array', () => {
      expect(reducer({...initialState, inventory: [newItem('potions', 'health potion'), newItem('containers', 'backpack')]}, {type: 'DROP_ALL'})).toEqual({
        ...initialState,
        inventory: []
      });
    });
  });
});
