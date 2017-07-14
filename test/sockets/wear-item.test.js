'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem from '../../app/data/items.js';

describe('wearItem', () => {
  let player1, player2;

  beforeEach(done => {
    let equipment = {
      head: null,
      shoulders: null,
      chest: null,
      legs: null,
      feet: null
    };

    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2.on('connect', () => {
      player2.emit('changeName', 'player2');
      player1.emit('changeName', 'player1');
      player2.emit('updateEquipment', equipment);
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

  describe('For armor', () => {
    it('should broadcast to the room that the item was worn', done => {
      let helm = newItem('equipment', 'leather helm');
      player1.emit('wearItem', {equip: helm});
      player2.on('generalMessage', item => {
        expect(item.from).toEqual('player1');
        expect(item.feedback).toEqual(` equips ${helm.short} on their ${helm.slot}.`);
        done();
      });
    });
  });

  describe('For weapons', () => {
    it('should broadcast to the room that the item was worn', done => {
      let sword = newItem('weapons', 'broad sword');
      player1.emit('wearItem', {equip: sword});
      player2.on('generalMessage', item => {
        expect(item.from).toEqual('player1');
        expect(item.feedback).toEqual(` equips ${sword.short} in their ${sword.slot}.`);
        done();
      });
    });
  });
});
