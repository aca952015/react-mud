'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('resurrect', () => {
  let player1, player2;

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player1.emit('teleport', 'Test - Nexus');
      player2.emit('teleport', 'Test - Nexus');
      player1.emit('updateEffects', {death: true});
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

  describe('If a healer isn\'t in the room', () => {
    beforeEach(done => {
      player1.emit('teleport', 'Test - Gallows');
      player1.emit('updateSocket');
      player1.on('updateComplete', () => done());
    });

    afterEach(done => {
      player1.disconnect();
      done();
    });

    it('should tell the user there\'s no one here to resurrect you', done => {
      player1.emit('resurrect');
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('There\'s no one here to resurrect you.');
        done();
      });
    });
  });

  describe('If the user isn\'t dead', () => {
    it('should tell the user they aren\'t dead', done => {
      player2.emit('resurrect');
      player2.on('generalMessage', res => {
        expect(res.feedback).toEqual('You aren\'t dead.');
        done();
      });
    });
  });

  describe('If the user is a dead and in front of a healer', () => {
    it('should return a generalMessage with a blessing', done => {
      player1.emit('resurrect');
      player1.on('generalMessage', res => {
        expect(res.interaction).toEqual(' closes her eyes, utters a blessing, and holds her palms above ');
        done();
      });
    });
  });
});
