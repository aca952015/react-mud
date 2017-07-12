'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {roomData} from '../../app/data/rooms.js';

describe('teleport', () => {
  let player1, player2;

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2.emit('changeName', 'player2');
    player2.emit('teleport', 'Nexus');
    player2.emit('updateSocket');
    player2.on('updateComplete', () => {
      done();
    });
  });

  afterEach(done => {
    player1.disconnect();
    player2.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  it('should emit the new room\'s occupants, roomData, and mobs', done => {
    player1.emit('teleport', 'Nexus');
    player1.on('generalMessage', res => {
      expect(res.mobs).toEqual(roomData['Nexus'].mobs);

      let room = roomData['Nexus'];
      delete room.mobs;
      expect({...res.room, resetTimer: 0}).toEqual(room);
      expect(res.occupants).toEqual(['player2']);
      done();
    });
  });
});
