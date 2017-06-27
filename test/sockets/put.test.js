'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem from '../../app/data/items.js';

describe('put', () => {
  let player1;
  let putObj = {
    container: 'backpack',
    item: newItem('health potion')
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

  describe('With a container not in the room', () => {
    it('should return feedback of not seeing it', done => {
      player1.emit('put', {...putObj, container: 'satchel'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('I don\'t see that container here.');
        done();
      });
    });
  });
});
