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
      expect({...res.room, itemResetTimer: 0, mobResetTimer: 0}).toEqual(room);
      expect(res.occupants).toEqual(['player2']);
      done();
    });
  });

  describe('With a ghost in the room', () => {
    let player3;

    beforeEach(done => {
      player3 = io.connect('http://0.0.0.0:5000', ioOptions);
      player3.on('connect', () => {
        player3.emit('changeName', 'player3');
        player3.emit('teleport', 'Gallows');
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
      player1.emit('teleport', 'Gallows');
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
