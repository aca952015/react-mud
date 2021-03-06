'use strict';

import {Character} from '../model/character.js';

export default function disconnect(socket, users) {
  socket.on('saveCharacter', character => {
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' vanishes into the nether.'});
    Character.findById(character._id)
    .then(char => {
      delete character._id; // Used to prevent issues of trying to overwrite IDs and getting errors

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
