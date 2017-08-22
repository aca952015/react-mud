'use strict';

import io from 'socket.io-client';
import {Character} from '../../model/character.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';

describe('createCharacter', () => {
  let player1;

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    done();
  });

  afterEach(done => {
    player1.disconnect();
    done();
  });

  afterAll(done => {
    Character.remove({})
    .then(() => {
      closeServer();
      done();
    });
  });

  it('should return a loginSuccessful event with a loginUser and loginEquipment', done => {
    player1.emit('createCharacter', {...user, newUsername: 'Bob', password: 'banana', equipment: {...equipment}});
    player1.on('loginSuccessful', res => {
      expect(res.loginUser.username).toEqual('Bob');
      expect(res.loginUser.password).toEqual(undefined);
      expect(res.loginUser.atk).toEqual(user.atk);
      expect(res.loginEquipment).toEqual(equipment);
      done();
    });
  });

  it('should return an error message if the right fields aren\'t passed', done => {
    player1.emit('createCharacter', {newUsername: '', password: ''});
    player1.on('generalMessage', res => {
      expect(res.feedback.message).toEqual('character validation failed: username: Path `username` is required.');
      done();
    });
  });
});
