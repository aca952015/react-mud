'use strict';

import io from 'socket.io-client';
import ioOptions from '../lib/io-options.js';
import closeServer from '../lib/test-server.js';
import newMob from '../../app/data/mobs.js';
import newItem from '../../app/data/items.js';

describe('mobTargetSelector', () => {
  let player1, player2;
  let bat = newMob('bat');
  let equipment = {
    head: null,
    shoulders: null,
    chest: null,
    legs: null,
    feet: null
  };
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player1.emit('kill', {target: 'bat'});
    });
    player1.on('enterCombat', () => {
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

  describe('With no armor equipped', () => {
    beforeEach(done => {
      player1.emit('updateEquipment', equipment);
      player1.emit('updateSocket');
      player1.on('updateComplete', () => done());
    });

    it('should pick a target from a mob\'s current targets and emit a damage event', done => {
      player1.emit('testMobSelector');
      player1.on('damage', res => {
        expect(res.enemy).toEqual({
          ...bat,
          id: res.enemy.id,
          combat: {
            active: true,
            targets: ['player1'] // Check that player2 didn't get drawn into combat somehow
          }
        });
        expect(res.damage).toEqual(bat.atk);
        done();
      });
    });
  });

  describe('With armor on, but enough to reduce the damage below 1', () => {
    beforeEach(done => {
      player1.emit('updateEquipment', {
        ...equipment,
        head: newItem('equipment', 'leather helm')
      });
      player1.emit('updateSocket');
      player1.on('updateComplete', () => done());
    });

    it('should return a damage object with the mob\'s atk minus the equipment\'s defense', done => {
      player1.emit('testMobSelector');
      player1.on('damage', res => {
        expect(res.damage).toEqual(bat.atk - newItem('equipment', 'leather helm').stats.def);
        done();
      });
    });
  });

  describe('With enough armor equipped to reduce the damage to less than 1', () => {
    beforeEach(done => {
      player1.emit('updateEquipment', {
        ...equipment,
        head: newItem('equipment', 'leather helm'),
        chest: newItem('equipment', 'leather breastplate'),
        feet: newItem('equipment', 'leather boots'),
        legs: newItem('equipment', 'leather leggings')
      });
      player1.emit('updateSocket');
      player1.on('updateComplete', () => done());
    });

    it('should reduce the damage to 1', done => {
      player1.emit('testMobSelector');
      player1.on('damage', res => {
        expect(res.enemy).toEqual({
          ...bat,
          id: res.enemy.id,
          combat: {
            active: true,
            targets: ['player1']
          }
        });
        expect(res.damage).toEqual(1);
        done();
      });
    });
  });
});
