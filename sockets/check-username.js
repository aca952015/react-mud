'use strict';

import {Character} from '../model/character.js';

export default function checkUsername(socket) {
  socket.on('checkUsername', checkObj => {
    Character.findOne({username: checkObj.newUsername.toLowerCase()})
    .then(char => {
      if (char) return socket.emit('generalMessage', {feedback: 'That name is taken. Please select a different name.'});
      socket.emit('nameAvailable', checkObj.newUsername);
    });
  });
}
