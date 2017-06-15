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
});
