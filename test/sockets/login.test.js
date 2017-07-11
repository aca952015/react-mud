'use strict';

import io from 'socket.io-client';
import {Character} from '../../model/character.js';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('login', () => {
  let player1;

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      done();
    });
  });

  afterEach(done => {
    Character.remove({})
    .then(() => {
      player1.disconnect();
      done();
    });
  });

  afterAll(done => {
    closeServer();
    done();
  });

  describe('With a character not existing', () => {
    it('should emit a loginFail event', done => {
      player1.emit('login', {username: 'Davy', password: 'banana'});
      player1.on('loginFail', res => {
        expect(res).toEqual({});
        done();
      });
    });
  });

  describe('With an existing character and valid password', () => {
    beforeEach(done => {
      new Character({...user, username: 'Davy', equipment})
      .hashPassword('banana')
      .then(char => char.save())
      .then(done);
    });

    it('should emit a loginSuccessful event', done => {
      player1.emit('login', {username: 'Davy', password: 'banana'});
      player1.on('loginSuccessful', res => {
        expect(res.loginUser.username).toEqual('Davy');
        expect(res.loginUser.password).toEqual(undefined);
        expect(res.loginUser.atk).toEqual(user.atk);
        expect(res.loginEquipment).toEqual(equipment);
        done();
      });
    });
  });

  describe('With an existing character, but invalid password', () => {
    beforeEach(done => {
      new Character({...user, username: 'Davy', equipment})
      .hashPassword('banana')
      .then(char => char.save())
      .then(done);
    });

    it('should emit a loginFail event', done => {
      player1.emit('login', {username: 'Davy', password: 'apes'});
      player1.on('loginFail', res => {
        expect(res).toEqual('Wrong password');
        done();
      });
    });
  });
});
