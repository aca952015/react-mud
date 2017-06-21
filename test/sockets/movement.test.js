'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import {ioOptions} from '../lib/io-options';
import {roomData} from '../../app/data/rooms.js';

describe('movement', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
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

  describe('Seeing another player login', () => {
    it('should emit a movementArrive with a direction of login', done => {
      player1.emit('move', {direction: 'login'});
      player2.on('movementArrive', res => {
        expect(res.username).toEqual('player1');
        expect(res.direction).toEqual('login');
        done();
      });
    });
  });

  describe('A user moving in a valid, unlocked direction', () => {
    it('should emit a move event with the new room name', done => {
      player1.emit('move', {direction: 'down'});
      player1.on('move', res => {
        expect(res).toEqual('Town Square');
        done();
      });
    });

    it('should emit a generalMessage event with feedback, occupants, and room', done => {
      player1.emit('move', {direction: 'down'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('You move down.');
        expect(res.occupants).toEqual([]);
        expect(res.room).toEqual(roomData['Town Square']);
        done();
      });
    });

    it('should emit a movementLeave event to other users in the room', done => {
      player1.emit('move', {direction: 'down'});
      player2.on('movementLeave', res => {
        expect(res.username).toEqual('player1');
        expect(res.direction).toEqual('down');
        done();
      });
    });
  });

  describe('A user moving in a valid, but locked direction', () => {
    it('should return feedback that the direction is locked', done => {
      player1.emit('move', {direction: 'up'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('That way is locked.');
        done();
      });
    });
  });

  describe('Seeing another player arrive', () => {
    it('should return a movementArrive event', done => {
      player2.emit('move', {direction: 'down'});
      player2.emit('move', {direction: 'up'});
      player1.on('movementArrive', res => {
        expect(res.username).toEqual('player2');
        expect(res.direction).toEqual('up');
        done();
      });
    });
  });
});
