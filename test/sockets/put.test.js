'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem from '../../app/data/items.js';

describe('put', () => {
  let player1;
  let putObj = {
    container: 'backpack',
    item: newItem('potions', 'health potion')
  };

  require('../lib/test-server.js');
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

  describe('With a container not in the room', () => {
    it('should return feedback of not seeing it', done => {
      player1.emit('put', {...putObj, container: 'satchel'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('I don\'t see that container here.');
        done();
      });
    });
  });

  describe('With a container that isn\'t a container', () => {
    it('should return feedback of it not being a container', done => {
      player1.emit('put', {...putObj, container: 'potion'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('That isn\'t a container.');
        done();
      });
    });
  });

  describe('With an invalid type', () => {
    it('should return feedback of an invalid item type', done => {
      player1.emit('put', {...putObj, item: newItem('containers', 'corpse')});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('That container doesn\'t hold that type of item.');
        done();
      });
    });
  });

  describe('With a valid type and target', () => {
    describe('With dot notation', () => {
      it('should trigger a forceDrop event', done => {
        player1.emit('put', {...putObj, container: '2.backpack'});
        player1.on('forceDrop', res => {
          expect(res).toEqual({...putObj.item, drink: res.drink});
          done();
        });
      });
    });

    describe('With normal targeting', () => {
      describe('With the full term', () => {
        it('should trigger a forceDrop event', done => {
          player1.emit('put', putObj);
          player1.on('forceDrop', res => {
            expect(res).toEqual({...putObj.item, drink: res.drink});
            done();
          });
        });
      });

      describe('With fuzzy matching', () => {
        it('should trigger a forceDrop event', done => {
          player1.emit('put', {...putObj, container: 'bac'});
          player1.on('forceDrop', res => {
            expect(res).toEqual({...putObj.item, drink: res.drink});
            done();
          });
        });
      });
    });
  });
});
