'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options';
import {roomData} from '../../app/data/rooms.js';

describe('look', () => {
  let player1, player2, player3, url = 'http://0.0.0.0:5000';

  beforeEach(done => {
    require('../lib/test-server.js');
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player3 = io.connect(url, ioOptions);
    player3.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player3.emit('changeName', 'player3');
      done();
    });
  });
  afterEach(done => {
    player1.disconnect();
    player2.disconnect();
    player3.disconnect();
    closeServer();
    done();
  });

  describe('Without a target', () => {
    it('should show player1 the room\'s description and occupants of player2 and player3', done => {
      player1.emit('look', {target: undefined});
      player1.on('generalMessage', res => {
        expect(res.room.roomName).toEqual(roomData['Nexus'].roomName);
        expect(res.room.desc).toEqual(roomData['Nexus'].desc);
        expect(res.room.exits).toEqual(roomData['Nexus'].exits);
        expect(res.occupants).toEqual(['player2', 'player3']);
        done();
      });
    });
  });
});
