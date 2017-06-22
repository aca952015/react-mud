'use strict';

import reducer from '../../app/reducers/user-reducer.js';

describe('user reducer', () => {
  const initialState = {
    username: 'tester',
    description: 'As actual players do not exist yet, everybody is a robot. They all look the same. They all speak the same. They look just like you.',
    inventory: [],
    hp: 15,
    maxHP: 20,
    mp: 11,
    maxMP: 20,
    level: 1,
    atk: 5,
    str: 18,
    int: 18,
    wis: 18,
    con: 18,
    dex: 18
  };

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
});
