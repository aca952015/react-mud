'use strict';

import {Character} from '../model/character.js';

export default function login(socket) {
  socket.on('login', auth => {
    Character.findOne({username: auth.username.toLowerCase()})
    .then(char => char.validatePassword(auth.password))
    .then(char => {
      // My attempts to send back a user without a password or equipment have proven
      // fruitless using Object.assign or any version of copying the char object.
      // I have attempted directly deleting properties off the char and that doesn't
      // work, either. The only method I've found to get everything working as
      // expected is this parse/stringify hack.
      const loginUser = JSON.parse(JSON.stringify(char));
      delete loginUser.equipment;
      delete loginUser.password;
      delete loginUser.effects;
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

      socket.emit('loginSuccessful', {loginUser, loginEquipment: equipment, effects: char.effects});
    })
    .catch(err => socket.emit('loginFail', err));
  });
}
