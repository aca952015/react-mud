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

      // For some reason, the properties kept inverting themselves every other login - e.g., slots
      // would be displayed from the feet up instead of the head down. Manually setting the
      // properties here fixes the problem, though I don't see the difference yet.
      const equipment = {
        head: char.equipment.head,
        shoulders: char.equipment.shoulders,
        'main hand': char.equipment['main hand'],
        'off hand': char.equipment['off hand'],
        chest: char.equipment.chest,
        legs: char.equipment.legs,
        feet: char.equipment.feet
      };

      socket.emit('loginSuccessful', {loginUser, loginEquipment: equipment});
    })
    .catch(() => socket.emit('loginFail'));
  });
}
