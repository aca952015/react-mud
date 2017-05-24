'use strict';

module.exports = socket => socket.on('changeName', name => socket.username = name);
