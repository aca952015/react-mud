'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options';
import {roomData} from '../../app/data/rooms.js';
import {itemData} from '../../app/data/items.js';

describe('look', () => {
  let player1, player2, player3, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player3 = io.connect(url, ioOptions);
    player3.on('connect', () => {
      player1.emit('changeName', 'player1');
      player1.emit('changeDescription', 'player1 desc');
      player2.emit('changeName', 'player2');
      player2.emit('changeDescription', 'player2 desc');
      player3.emit('changeName', 'player3');
      player3.emit('changeDescription', 'player3 desc');
      done();
    });
  });
  afterEach(done => {
    player1.disconnect();
    player2.disconnect();
    player3.disconnect();
    done();
  });

  afterAll(done => {
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

  describe('With the user looking at a player', () => {
    it('should show player1 the description of player2', done => {
      player1.emit('look', {target: 'player2'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('player2 desc');
        done();
      });
    });
  });

  describe('With the user being looked at by a player', () => {
    it('should show "player1 looks at player2"', done => {
      player1.emit('look', {target: 'player2'});
      player2.on('generalMessage', res => {
        expect(res.from).toEqual('player1');
        expect(res.interaction).toEqual(' looks at ');
        expect(res.target).toEqual('player2');
        done();
      });
    });
  });

  describe('With the user looking at an item', () => {
    it('should show the item\'s description', done => {
      player1.emit('look', {target: 'potion'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual(itemData['health potion'].description);
        done();
      });
    });
  });

  describe('With the user seeing another player look at an item', () => {
    it('should show "player1 looks at <item short>."', done => {
      player1.emit('look', {target: 'potion'});
      player2.on('generalMessage', res => {
        expect(res.from).toEqual('player1');
        expect(res.feedback).toEqual(` looks at ${itemData['health potion'].short}.`);
        done();
      });
    });
  });

  describe('With the user looking at an examine', () => {
    it('should show player1 the examine description', done => {
      player1.emit('look', {target: 'test'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual(roomData['Nexus'].examines[0].description);
        done();
      });
    });
  });
});
