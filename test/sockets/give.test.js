'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem from '../../app/data/items.js';

describe('give', () => {
  let player1, player2, alien;
  let giveObj = {item: newItem('potions', 'health potion')};
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    alien = io.connect('http://0.0.0.0:5000', ioOptions);
    alien.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      alien.emit('changeName', 'alien');
      done();
    });
  });

  afterEach(done => {
    player1.disconnect();
    player2.disconnect();
    alien.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  describe('To a player that exists, but isn\'t in the room', () => {
    describe('With a give event', () => {
      it('should give feedback that that player isn\'t seen', done => {
        player1.emit('give', {...giveObj, target: 'alien'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that person here.');
          done();
        });
      });
    });

    describe('With a giveAll event', () => {
      it('should give feedback that that player isn\'t seen', done =>  {
        player1.emit('giveAll', {itemArray: [newItem('potions', 'health potion')], target: 'alien'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that person here.');
          done();
        });
      });
    });
  });

  describe('To a player that doesn\'t exist', () => {
    it('should give feedback that that player isn\'t seen', done => {
      player1.emit('give', {...giveObj, target: 'bob'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('I don\'t see that person here.');
        done();
      });
    });
  });

  describe('To a valid player in the same room', () => {
    it('should emit a generalMessage event', done => {
      player1.emit('give', {...giveObj, target: 'player2'});
      player2.on('generalMessage', res => {
        expect(res.from).toEqual('player1');
        expect(res.interaction).toEqual(` gives ${giveObj.item.short} to `);
        expect(res.target).toEqual('player2');
        done();
      });
    });
  });
});
