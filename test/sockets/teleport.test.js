'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {roomData} from '../../app/data/rooms.js';

describe('teleport', () => {
  const TEST_ROOM = 'Test - Nexus';
  let player1, player2, url = 'http://0.0.0.0:5000';

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.emit('changeName', 'player2');
    player2.emit('teleport', TEST_ROOM);
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
    player1.emit('teleport', TEST_ROOM);
    player1.on('generalMessage', res => {
      expect(res.mobs).toEqual(roomData[TEST_ROOM].mobs);

      const room = roomData[TEST_ROOM];
      delete room.mobs;
      expect({...res.room, itemResetTimer: 0, mobResetTimer: 0, lockedExitTimer: 0}).toEqual(room);
      expect(res.occupants).toEqual(['player2']);
      done();
    });
  });

  describe('With a ghost in the room', () => {
    let player3;

    beforeEach(done => {
      player3 = io.connect(url, ioOptions);
      player3.on('connect', () => {
        player3.emit('changeName', 'player3');
        player3.emit('teleport', 'Test - Gallows');
        player3.emit('updateEffects', {death: true});
        player3.emit('updateSocket');
        player3.on('updateComplete', () => done());
      });
    });

    afterEach(done => {
      player3.disconnect();
      done();
    });

    it('should show ghosts if there are any', done => {
      player1.emit('teleport', 'Test - Gallows');
      player1.on('generalMessage', res => {
        expect(res.occupants).toEqual(['The ghost of player3']);
        done();
      });
    });
  });

  describe('To a room with no examines', () => {
    it('should not have any examines in the response', done => {
      player1.emit('teleport', 'Login Room');
      player1.on('generalMessage', res => {
        expect(res.room.examines).toEqual(null);
        done();
      });
    });
  });
});
