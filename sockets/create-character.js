'use strict';

import {initialState as equipment} from '../app/data/equipment-initial-state.js';
import {initialState as user} from '../app/data/user-initial-state.js';
import {Character} from '../model/character.js';

export default function createCharacter(socket) {
  socket.on('createCharacter', character => {
    const password = character.password;
    delete character.password;

    const tempCharacter = {
      ...equipment,
      ...user,
      username: character.newUsername
    };

    const loginUser = {
      ...user,
      username: character.newUsername
    };
    const loginEquipment = equipment;

    const char = new Character(tempCharacter);
    char.hashPassword(password)
    .then(_char => _char.save())
    .then(_char => {
      socket.emit('characterID', _char._id);
      socket.emit('generalMessage', {feedback: 'Character created.'});
      socket.emit('loginSuccessful', {loginUser, loginEquipment});
    })
    .catch(err => socket.emit('generalMessage', {feedback: err}));
  });
}
