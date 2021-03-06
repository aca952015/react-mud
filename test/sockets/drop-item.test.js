'use strict';

import io from 'socket.io-client';
import newItem, {itemData} from '../../app/data/items.js';
import ioOptions from '../lib/io-options.js';
import closeServer from '../lib/test-server.js';

describe('Drop item', () => {
  let socket, socket2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    socket = io.connect(url, ioOptions);
    socket2 = io.connect(url, ioOptions);
    socket2.on('connect', () => {
      done();
    });
  });
  afterEach(done => {
    socket.disconnect();
    socket2.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  it('should return a drop object with the username and a drop feedback', done => {
    socket.emit('changeName', 'tester');
    socket2.emit('changeName', 'TestR');
    socket.emit('drop', {item: newItem('potions', 'health potion')});
    socket2.on('generalMessage', res => {
      expect(res.from).toEqual('tester');
      expect(res.feedback).toEqual(` drops ${itemData['potions']['health potion'].short}.`);
      done();
    });
  });

  describe('with dropAll', () => {
    it('should return a generalMessage of everything being dropped', done => {
      socket.emit('changeName', 'tester');
      socket.emit('dropAll', {itemArray: newItem('potions', 'health potion')});
      socket2.on('generalMessage', res => {
        expect(res.from).toEqual('tester');
        expect(res.feedback).toEqual(' drops everything they\'re carrying.');
        done();
      });
    });
  });
});
