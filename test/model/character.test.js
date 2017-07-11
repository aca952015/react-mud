'use strict';

import {Character} from '../../model/character.js';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';

describe('Character model', () => {
  it('should return a new character with proper fields', () => {
    const someGuy = new Character({...user, equipment: {...equipment}, password: 'banana'});
    expect(someGuy.username).toEqual(user.username.toLowerCase());
    expect(someGuy.equipment).toEqual(equipment);
    expect(someGuy.password).toEqual('banana');
    expect(someGuy.hashPassword).not.toEqual(undefined);
    expect(someGuy.validatePassword).not.toEqual(undefined);
  });
});
