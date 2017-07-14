'use strict';

import {Character} from '../model/character.js';

export default function disconnect(socket, users) {
  socket.on('saveCharacter', character => {
    Character.findById(character._id)
    .then(char => {
      // findByIdAndUpdate does not work on effects, so it must be saved using the markModified and
      // manual save functions.
      char.effects = character.effects;
      char.markModified('effects');
      return char.save();
    })
    .then(char => Character.findByIdAndUpdate(char._id, {...character, username: character.username.toLowerCase()}))
    .then(() => Promise.resolve(socket.emit('generalMessage', {feedback: 'Character saved.'})))
    .then(() => users.splice(users.indexOf(users.find(user => user.username === socket.username)), 1))
    .catch(err => socket.emit('generalMessage', {err, feedback: `Error saving character: ${err.message}.`}));
  });
}
