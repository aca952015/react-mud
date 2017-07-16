'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';

describe('skill', () => {
  let player1, player2, target;

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      player2.emit('changeName', 'player1');
      player2.emit('updateEquipment', equipment);
      player2.emit('updateEffects', {});
      player1.emit('changeName', 'player1');
      player1.emit('updateEquipment', equipment);
      player1.emit('updateEffects', {});
      player1.emit('teleport', 'Nexus');
      player1.emit('updateSocket');
      player1.on('updateComplete', () => done());
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

  describe('With a living target', () => {
    describe('Still alive after the skill', () => {
      it('should emit to the room a generalMessage with a combatLog', done => {
        player1.emit('kill', {target: 'zombie'});
        player1.on('enterCombat', res => {
          target = res;
          player2.emit('teleport', 'Nexus');
          player2.emit('updateSocket');
          player2.on('updateComplete', () => {
            player1.emit('skill', {enemy: target, damage: 5, echoLog: {}});
            player2.on('generalMessage', response => {
              expect(response.combatLog).toEqual({});
              done();
            });
          });
        });
      });
    });

    describe('With enough damage to kill the target', () => {
      it('should call slayEnemy', done => {
        player1.emit('skill', {enemy: target, damage: 20, echoLog: {}});
        player1.on('generalMessage', res => {
          expect(res.combatLog).toEqual({
            from: {
              friendly: 'You'
            },
            interaction: ' have slain ',
            target: {
              enemy: target.short
            },
            punctuation: '!'
          });
          done();
        });
      });
    });
  });
});
