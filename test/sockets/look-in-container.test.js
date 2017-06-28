'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('lookInContainer', () => {
  let player1;
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

  describe('With a container that doesn\'t exist', () => {
    it('should return feedback saying so', done => {
      player1.emit('lookInContainer', {container: 'satchel'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('I don\'t see that container here.');
        done();
      });
    });
  });

  describe('With a target that isn\'t a container', () => {
    it('should return feedback saying so', done => {
      player1.emit('lookInContainer', {container: 'key'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('That isn\'t a container.');
        done();
      });
    });
  });

  describe('With a valid target', () => {
    it('should return containedItems', done => {
      player1.emit('lookInContainer', {container: 'corpse'});
      player1.on('generalMessage', res => {
        expect(res.containedItems).toEqual([]);
        done();
      });
    });
  });
});
