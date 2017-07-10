'use strict';

import combatProcessor from '../../app/processors/combat-processor.js';
import io from 'socket.io-client';
import ioOptions from '../lib/io-options.js';
import closeServer from '../lib/test-server.js';
import {initialState} from '../../app/data/equipment-initial-state.js';
import newItem from '../../app/data/items.js';

describe('combatProcessor', () => {
  require('../lib/test-server.js');
  let player1;
  let props = {
    combat: {
      active: true,
      targets: []
    },
    atk: 2
  };

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      player1.emit('changeName', 'player1');
      done();
    });
  });

  afterEach(done => {
    player1.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  describe('With no weapon equipped', () => {
    beforeEach(done => {
      player1.emit('kill', {target: 'bat'});
      player1.on('enterCombat', res => {
        props.combat.targets = [res];
        done();
      });
    });

    it('should emit a damage event and receive a generalMessage response', done => {
      props.equipment = initialState;
      combatProcessor(player1, props);
      player1.on('generalMessage', res => {
        expect(res).toEqual({
          combatLog: {
            from: {
              friendly: 'You'
            },
            pre: ' deal ',
            damage: props.atk,
            post: ' damage to ',
            target: {
              enemy: 'a small bat'
            },
            punctuation: '.'
          }
        });
        done();
      });
    });
  });

  describe('With a weapon equipped', () => {
    beforeEach(done => {
      player1.emit('kill', {target: 'bat'});
      player1.on('enterCombat', res => {
        props.combat.targets = [res];
        done();
      });
    });

    it('should emit a damage event with proper calculations and receive a generalMessage response', done => {
      props.equipment = {...initialState, 'main hand': newItem('weapons', 'broad sword')};
      combatProcessor(player1, props);
      player1.on('generalMessage', res => {
        expect(res).toEqual({
          combatLog: {
            from: {
              friendly: 'You'
            },
            pre: ' deal ',
            damage: props.atk + props.equipment['main hand'].stats.atk,
            post: ' damage to ',
            target: {
              enemy: 'a small bat'
            },
            punctuation: '.'
          }
        });
        done();
      });
    });
  });

  describe('On an enemy with def higher than damage', () => {
    beforeEach(done => {
      player1.emit('kill', {target: 'zombie'});
      player1.on('enterCombat', res => {
        props.combat.targets = [res];
        done();
      });
    });

    it('should emit a damage event with a damage of 1', done => {
      props.equipment = initialState;
      combatProcessor(player1, props);
      player1.on('generalMessage', res => {
        expect(res).toEqual({
          combatLog: {
            from: {
              friendly: 'You'
            },
            pre: ' deal ',
            damage: 1,
            post: ' damage to ',
            target: {
              enemy: 'an armored zombie'
            },
            punctuation: '.'
          }
        });
        done();
      });
    });
  });
});
