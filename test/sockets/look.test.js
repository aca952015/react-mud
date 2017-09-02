'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options';
import {roomData} from '../../app/data/rooms.js';
import newMob from '../../app/data/mobs.js';
import {itemData} from '../../app/data/items.js';

describe('look', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player1.emit('changeDescription', {playerDescription: ['player1 desc']});
      player1.emit('teleport', 'Test - Nexus');
      player2.emit('teleport', 'Test - Nexus');
      player2.emit('changeName', 'player2');
      player2.emit('changeDescription', {playerDescription: ['player2 desc']});
      player2.emit('updateEquipment', {
        head: null,
        shoulders: null,
        chest: null,
        legs: null,
        feet: null
      });
      player2.emit('updateSocket');
      player2.on('updateComplete', () => done());
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

  describe('Without a target', () => {
    describe('In a room without examines', () => {
      beforeEach(done => {
        player1.emit('teleport', 'Login Room');
        player1.emit('updateSocket');
        player1.on('updateComplete', () => done());
      });

      it('should show player1 the room\'s description and occupants of player2', done => {
        player1.emit('look', {target: undefined});
        player1.on('generalMessage', res => {
          expect(res.room.roomTitle).toEqual('Welcome to Tempest');
          expect(res.room.desc).toEqual(roomData['Login Room'].desc);
          expect(res.room.exits).toEqual(roomData['Login Room'].exits);
          expect(res.room.examines).toEqual(null);
          done();
        });
      });
    });

    describe('In a room with examines', () => {
      it('should return examines in the res.room object', done => {
        player1.emit('look', {target: undefined});
        player1.on('generalMessage', res => {
          expect(res.room.examines).toEqual(roomData['Test - Nexus'].examines);
          expect(res.occupants).toEqual(['player2']);
          done();
        });
      });
    });

    describe('In a room with a ghost occupant', () => {
      let player3;

      beforeEach(done => {
        player3 = io.connect('http://0.0.0.0:5000', ioOptions);
        player3.on('connect', () => {
          player3.emit('updateEffects', {death: true});
          player3.emit('teleport', 'Test - Nexus');
          player3.emit('changeName', 'player3');
          player3.emit('updateEquipment', {
            head: null
          });
          player3.emit('updateSocket');
          player3.on('updateComplete', () => done());
        });
      });

      afterEach(done => {
        player3.disconnect();
        done();
      });

      it('should return "The ghost of player3" as an occupant', done => {
        player1.emit('look', {target: undefined});
        player1.on('generalMessage', res => {
          expect(res.occupants).toEqual(['player2', 'The ghost of player3']);
          done();
        });
      });

      it('should return "The ghost of player3" as a looker', done => {
        player3.emit('look', {target: 'player1'});
        player1.on('generalMessage', res => {
          expect(res.from).toEqual('The ghost of player3');
          expect(res.interaction).toEqual(' looks at ');
          expect(res.target).toEqual('player1');
          done();
        });
      });
    });
  });

  describe('With the user looking at a player', () => {
    it('should show player1 the description of player2 and their equipment', done => {
      player1.emit('look', {target: 'player2'});
      player1.on('generalMessage', res => {
        expect(res.playerDescription).toEqual(['player2 desc']);
        expect(res.name).toEqual('player2');
        expect(res.equipment).toEqual({
          head: null,
          shoulders: null,
          chest: null,
          legs: null,
          feet: null
        });
        done();
      });
    });
  });

  describe('With the user being looked at by a player', () => {
    it('should show "player1 looks at player2"', done => {
      player1.emit('look', {target: 'player2'});
      player2.on('generalMessage', res => {
        expect(res.from).toEqual('player1');
        expect(res.interaction).toEqual(' looks at ');
        expect(res.target).toEqual('player2');
        done();
      });
    });
  });

  describe('With the user looking at an item', () => {
    describe('To an observer', () => {
      describe('If the user is living', () => {
        it('should show "so-and-so" looks at the item\'s short', done => {
          player1.emit('look', {target: 'pot'});
          player2.on('generalMessage', res => {
            expect(res.from).toEqual('player1');
            expect(res.feedback).toEqual(' looks at a red potion.');
            done();
          });
        });
      });

      describe('If the user is dead', () => {
        let player3;

        beforeEach(done => {
          player3 = io.connect('http://0.0.0.0:5000', ioOptions);
          player3.on('connect', () => {
            player3.emit('changeName', 'player3');
            player3.emit('teleport', 'Test - Nexus');
            player3.emit('updateEffects', {death: true});
            player3.emit('updateSocket');
            player3.on('updateComplete', () => done());
          });
        });

        afterEach(done => {
          player3.disconnect();
          done();
        });

        it('should show "the ghost of so-and-so" looks at an item', done => {
          player3.emit('look', {target: 'pot'});
          player1.on('generalMessage', res => {
            expect(res.from).toEqual('The ghost of player3');
            expect(res.feedback).toEqual(' looks at a red potion.');
            done();
          });
        });
      });
    });

    describe('With fuzzy matching', () => {
      it('should show the first matching item\'s description', done => {
        player1.emit('look', {target: 'pot'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(itemData['potions']['health potion'].description);
          done();
        });
      });
    });

    describe('With the full term', () => {
      it('should show the item\'s description', done => {
        player1.emit('look', {target: 'potion'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(itemData['potions']['health potion'].description);
          done();
        });
      });
    });
  });

  describe('With the user seeing another player look at an item', () => {
    it('should show "player1 looks at <item short>."', done => {
      player1.emit('look', {target: 'potion'});
      player2.on('generalMessage', res => {
        expect(res.from).toEqual('player1');
        expect(res.feedback).toEqual(` looks at ${itemData['potions']['health potion'].short}.`);
        done();
      });
    });
  });

  describe('With the user looking at a mob', () => {
    describe('With fuzzy matching', () => {
      it('should show the bat\'s description', done => {
        player1.emit('look', {target: 'b'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(newMob('bat').description);
          expect(res.equipment).toEqual(undefined);
          done();
        });
      });
    });

    describe('With the full term', ()  => {
      it('should show the bat\'s description', done => {
        player1.emit('look', {target: 'bat'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(newMob('bat').description);
          done();
        });
      });
    });
  });

  describe('With the user seeing a player look at a mob', () => {
    describe('If the player is alive', () => {
      it('should show "player1 looks at <mob short>".', done => {
        player1.emit('look', {target: 'bat'});
        player2.on('generalMessage', res => {
          expect(res.from).toEqual('player1');
          expect(res.feedback).toEqual(` looks at ${newMob('bat').short}.`);
          done();
        });
      });
    });

    describe('If the player is dead', () => {
      let player3;
      beforeEach(done => {
        player3 = io.connect('http://0.0.0.0:5000', ioOptions);
        player3.on('connect', () => {
          player3.emit('changeName', 'player3');
          player3.emit('teleport', 'Test - Nexus');
          player3.emit('updateEffects', {death: true});
          player3.emit('updateSocket');
          player3.on('updateComplete', () => done());
        });
      });

      afterEach(done => {
        player3.disconnect();
        done();
      });

      it('should show "the ghost of so-and-so" looks at an item', done => {
        player3.emit('look', {target: 'zomb'});
        player1.on('generalMessage', res => {
          expect(res.from).toEqual('The ghost of player3');
          expect(res.feedback).toEqual(' looks at an armored zombie.');
          done();
        });
      });
    });
  });

  describe('With the user looking at an examine', () => {
    describe('With fuzzy matching', () => {
      it('should show player1 the examine description', done => {
        player1.emit('look', {target: 'zt'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(roomData['Test - Nexus'].examines[0].description);
          done();
        });
      });
    });

    describe('With the full term', () => {
      it('should show player1 the examine description', done => {
        player1.emit('look', {target: 'ztest'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(roomData['Test - Nexus'].examines[0].description);
          done();
        });
      });
    });
  });

  describe('With the user seeing a player look at an examine', () => {
    describe('If the player is alive', () => {
      it('should show "player1 looks at <examine name>."', done => {
        player1.emit('look', {target: 'ztest'});
        player2.on('generalMessage', res => {
          expect(res.feedback).toEqual(` looks at ${roomData['Test - Nexus'].examines[0].name}.`);
          expect(res.from).toEqual('player1');
          done();
        });
      });
    });

    describe('If the player is dead', () => {
      let player3;
      beforeEach(done => {
        player3 = io.connect('http://0.0.0.0:5000', ioOptions);
        player3.on('connect', () => {
          player3.emit('changeName', 'player3');
          player3.emit('teleport', 'Test - Nexus');
          player3.emit('updateEffects', {death: true});
          player3.emit('updateSocket');
          player3.on('updateComplete', () => done());
        });
      });

      afterEach(done => {
        player3.disconnect();
        done();
      });

      it('should show "the ghost of so-and-so" looks at an item', done => {
        player3.emit('look', {target: 'ztest'});
        player1.on('generalMessage', res => {
          expect(res.from).toEqual('The ghost of player3');
          expect(res.feedback).toEqual(' looks at ztest.');
          done();
        });
      });
    });
  });

  describe('Using dot notation', () => {
    describe('For an item', () => {
      it('should show a health potion description', done => {
        player1.emit('look', {target: '2.potion'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(itemData['potions']['health potion'].description);
          done();
        });
      });
    });

    describe('For a mob', () => {
      it('should show the mob\'s description', done => {
        player1.emit('look', {target: '2.bat'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual(newMob('bat').description);
          done();
        });
      });
    });
  });

  describe('At an invalid item', () => {
    describe('In a room with examines', () => {
      it('should say "I don\'t see that here."', done => {
        player1.emit('look', {target: 'turtle'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that here.');
          done();
        });
      });
    });

    describe('In a room without examines', () => {
      beforeEach(done => {
        player1.emit('teleport', 'Login Room');
        player1.emit('updateSocket');
        player1.on('updateComplete', () => done());
      });

      it('should say "I don\'t see that here."', done => {
        player1.emit('look', {target: 'turtle'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that here.');
          done();
        });
      });
    });
  });
});
