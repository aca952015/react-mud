'use strict';

export default function resurrect(socket, roomData) {
  socket.on('resurrect', () => {
    let healer = roomData[socket.currentRoom].mobs.find(mob => mob.name === 'healer');
    if (!healer) return socket.emit('generalMessage', {feedback: 'There\'s no one here to resurrect you.'});
    if (!socket.effects.death) return socket.emit('generalMessage', {feedback: 'You aren\'t dead.'});

    socket.emit('generalMessage', {from: `${healer.short[0].toUpperCase()}${healer.short.slice(1)}`, interaction: ' closes her eyes, utters a blessing, and holds her palms above ', target: 'you'});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: `${healer.short[0].toUpperCase()}${healer.short.slice(1)}`, interaction: ' closes her eyes, utters a blessing, and holds her palms above ', target: socket.username});

    socket.emit('generalMessage', {interaction: 'A bright column of light washes over ', target: 'you'});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {interaction: 'A bright column of light washes over ', target: socket.username});

    socket.emit('resurrect');
    socket.emit('generalMessage', {feedback: 'You have been RESURRECTED!'});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' has been resurrected!'});
  });
}
