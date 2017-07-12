'use strict';

import {Character} from '../model/character.js';

export default function saveCharacter(socket) {
  socket.on('saveCharacter', character => {
    Character.findByIdAndUpdate(character._id, {...character, username: character.username.toLowerCase()})
    .then(() => socket.emit('generalMessage', {feedback: 'Character saved.'}))
    .catch(err => socket.emit('generalMessage', {err, feedback: 'Error saving character.'}));
  });
}
