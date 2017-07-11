'use strict';

import bcrypt from 'bcrypt';
import {Character} from '../../model/character.js';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';

describe('Character model', () => {
  const someGuy = new Character({...user, equipment: {...equipment}, password: 'banana'});

  describe('new Character', () => {
    it('should return a new character with proper fields', () => {
      expect(someGuy.username).toEqual(user.username.toLowerCase());
      expect(someGuy.equipment).toEqual(equipment);
      expect(someGuy.password).toEqual('banana');
      expect(someGuy.hashPassword).not.toEqual(undefined);
      expect(someGuy.validatePassword).not.toEqual(undefined);
    });
  });

  describe('hashPassword', () => {
    it('should return a hashed password', done => {
      someGuy.hashPassword('banana')
      .then(char => {
        expect(bcrypt.compareSync('banana', char.password)).toEqual(true);
        done();
      });
    });
  });

  describe('validatePassword', () => {
    beforeEach(done => {
      someGuy.hashPassword('banana')
      .then(done);
    });

    describe('With the right password', () => {
      it('should return the user object', done => {
        someGuy.validatePassword('banana')
        .then(char => {
          expect(char.username).toEqual(user.username.toLowerCase());
          expect(char.atk).toEqual(user.atk);
          done();
        });
      });
    });

    describe('With the wrong password', () => {
      it('should return the phrase "Wrong password"', done => {
        someGuy.validatePassword('apes')
        .catch(err => {
          expect(err).toEqual('Wrong password');
          done();
        });
      });
    });
  });
});
