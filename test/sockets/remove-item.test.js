'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem from '../../app/data/items.js';

describe('removeItem', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  let helm = newItem('equipment', 'leather helm');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      let equipment = {
        head: helm,
        shoulders: null,
        chest: null,
        legs: null,
        feet: null
      };
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player1.emit('updateEquipment', equipment);
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

  it('should broadcast a generalMessage of player1 removing the item', done => {
    player1.emit('removeItem', {removeEquip: helm});
    player2.on('generalMessage', res => {
      expect(res.from).toEqual('player1');
      expect(res.feedback).toEqual(` removes ${helm.short}.`);
      done();
    });
  });
});
