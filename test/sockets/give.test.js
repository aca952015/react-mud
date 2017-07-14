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
      player1.emit('updateEffects', {});
      player2.emit('updateEffects', {});
      alien.emit('updateEffects', {});
      alien.emit('updateSocket');
      alien.on('updateComplete', () => done());
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
    describe('With a give event', () => {
      it('should give feedback that that player isn\'t seen', done => {
        player1.emit('give', {...giveObj, target: 'bob'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that person here.');
          done();
        });
      });
    });

    describe('With a giveAll event', () => {
      it('should give feedback that that player isn\'t seen', done =>  {
        player1.emit('giveAll', {itemArray: [newItem('potions', 'health potion')], target: 'dave'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that person here.');
          done();
        });
      });
    });
  });

  describe('To a valid player in the same room', () => {
    describe('With a give event', () => {
      describe('To a living person', () => {
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

      describe('To a ghost', () => {
        let player3;
        beforeEach(done => {
          player3 = io.connect('http://0.0.0.0:5000', ioOptions);
          player3.on('connect', () => {
            player3.emit('changeName', 'player3');
            player3.emit('updateEffects', {death: true});
            player3.emit('updateSocket');
            player3.on('updateComplete', () => done());
          });
        });

        afterEach(done => {
          player3.disconnect();
          done();
        });

        it('should emit a generalMessage event saying they can\'t do that', done => {
          player1.emit('give', {...giveObj, target: 'player3'});
          player1.on('generalMessage', res => {
            expect(res.feedback).toEqual('You can\'t give things to ghosts.');
            done();
          });
        });
      });
    });

    describe('With a giveAll event', () => {
      it('should emit a forceDropAll event', done => {
        player1.emit('giveAll', {itemArray: [newItem('potions', 'health potion')], target: 'player2'});
        player1.on('forceDropAll', () => {
          done();
        });
      });

      it('should emit a generalMessage to the room', done => {
        player1.emit('giveAll', {itemArray: [newItem('potions', 'health potion')], target: 'player2'});
        player2.on('generalMessage', res => {
          expect(res.from).toEqual('player1');
          expect(res.interaction).toEqual(' gives everything they\'re carrying to ');
          expect(res.target).toEqual('player2');
          done();
        });
      });
    });
  });
});
