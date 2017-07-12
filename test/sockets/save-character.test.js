'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {Character} from '../../model/character.js';
import newItem from '../../app/data/items.js';

describe('save character', function() {
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

  describe('Updating an existing character', () => {
    beforeEach(done => {
      new Character({...user, username: 'Bob', equipment})
      .hashPassword('banana')
      .then(char => {
        this.tempChar = char._doc;
        return char.save();
      })
      .then(done);
    });

    it('should update the character', done => {
      let helm = newItem('equipment', 'leather helm');
      player1.emit('saveCharacter', {
        ...this.tempChar,
        equipment: {
          ...this.tempChar.equipment,
          head: helm
        }
      });
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('Character saved.');
        done();
      });
    });
  });

  describe('Updating a character that doesn\'t exist (for some reason)', () => {
    it('should return a generalMessage with an error', done => {
      player1.emit('saveCharacter', {_id: '4a', username: 'duder'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('Error saving character.');
        done();
      });
    });
  });
});
