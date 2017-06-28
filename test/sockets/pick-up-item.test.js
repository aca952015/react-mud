'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem, {itemData} from '../../app/data/items.js';

describe('pickUpItem', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player2.emit('changeName', 'player2');
      player1.emit('changeName', 'player1');
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

  describe('With dot notation', () => {
    describe('With a valid item in the room', () => {
      describe('The user picking the item up', () => {
        it('should return an itemPickedUp event', done => {
          player1.emit('pickUpItem', {item: '2.potion'});
          player1.on('itemPickedUp', res => {
            let expected = newItem('health potion');
            delete expected.drink.effect;
            expect(res.item).toEqual({...expected, id: res.item.id});
            expect(res.pickRoom).toEqual('Nexus');
            done();
          });
        });
      });

      describe('Users seeing a player pick an item up', () => {
        it('should return a pickUpItem event', done => {
          player1.emit('pickUpItem', {item: '2.potion'});
          player2.on('pickUpItem', res => {
            expect(res.room.pickRoom).toEqual('Nexus');
            expect(res.room.item.short).toEqual(itemData['mana potion'].short);
            expect(res.from).toEqual('player1');
            done();
          });
        });
      });
    });

    describe('With an invalid item in the room', () => {
      it('should return a feedback of not seeing the item', done => {
        player1.emit('pickUpItem', {item: '4.key'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that item here.');
          done();
        });
      });
    });

    describe('With a valid item, but one that isn\'t in the room', () => {
      it('should return a feedback of not seeing the item', done => {
        player1.emit('pickUpItem', {item: 'gallows'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that item here.');
          done();
        });
      });
    });
  });

  describe('Without dot notation', () => {
    it('should return a pickUpItem event', done => {
      player1.emit('pickUpItem', {item: 'potion'});
      player1.on('itemPickedUp', res => {
        let expected = newItem('health potion');
        delete expected.drink.effect;
        expect(res.item).toEqual({...expected, id: res.item.id});
        expect(res.pickRoom).toEqual('Nexus');
        done();
      });
    });
  });

  describe('On an item of an invalid type', () => {
    it('should return a feedback of not being able to pick it up', done => {
      player1.emit('pickUpItem', {item: 'corpse'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('You can\'t pick that up.');
        done();
      });
    });
  });

  describe('From a container', () => {
    describe('With a container that doesn\'t exist', () => {
      it('should return feedback of not seeing it', done => {
        player1.emit('getFromContainer', {item: 'satchel', container: 'bush'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that container here.');
          done();
        });
      });
    });

    describe('With an item that isn\'t a container', () => {
      it('should return feedback that it isn\'t a container', done => {
        player1.emit('getFromContainer', {item: 'potion', container: 'key'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('That isn\'t a container.');
          done();
        });
      });
    });

    describe('With a valid container', () => {
      describe('With an invalid item', () => {
        it('should return feedback that the item isn\'t found', done => {
          player1.emit('getFromContainer', {item: 'key', container: 'backpack'});
          player1.on('generalMessage', res => {
            expect(res.feedback).toEqual('I don\'t see that item in that container.');
            done();
          });
        });
      });

      describe('With a valid item', () => {
        describe('With an invalid pickup type', () => {
          it('should return feedback that that item can\'t be picked up', done => {
            player1.emit('getFromContainer', {item: 'corpse', container: 'backpack'});
            player1.on('generalMessage', res => {
              expect(res.feedback).toEqual('You can\'t pick that up.');
              done();
            });
          });
        });

        describe('With valid type, dot notation on item, but not container', () => {
          it('should return an itemPickedUp event', done => {
            player1.emit('getFromContainer', {item: '2.potion', container: 'backpack'});
            player1.on('itemPickedUp', res => {
              expect(res.item).toEqual({...newItem('mana potion'), drink: res.item.drink, id: res.item.id});
              done();
            });
          });
        });
      });
    });
  });
});
