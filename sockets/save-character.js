'use strict';

import {Character} from '../model/character.js';

export default function saveCharacter(socket) {
  socket.on('saveCharacter', character => {
    Character.findByIdAndUpdate(character._id, {...character, username: character.username.toLowerCase()})
    .catch(() => socket.emit('generalMessage', {feedback: 'Error saving character.'}));
  });
}
