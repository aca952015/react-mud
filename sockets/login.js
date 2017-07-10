'use strict';

import {Character} from '../model/character.js';

export default function login(socket) {
  socket.on('login', auth => {
    Character.findOne({username: auth.username.toLowerCase()})
    .then(char => char.validatePassword(auth.password))
    .then(char => {
      const loginUser = JSON.parse(JSON.stringify(char));
      delete loginUser.equipment;
      delete loginUser.password;
      loginUser.username = `${loginUser.username[0].toUpperCase()}${loginUser.username.slice(1)}`;

      const loginEquipment = char.equipment;

      socket.emit('loginSuccessful', {loginUser, loginEquipment});
    })
    .catch(() => socket.emit('loginFail'));
  });
}
