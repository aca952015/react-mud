'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options';
import {startCooldown} from '../../app/actions/skill-actions.js';
import {addEffect} from '../../app/actions/combat-actions.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';

describe('skill', () => {
  const TEST_ROOM = 'Test - Nexus';
  let player1, player2, player3, target, url = 'http://0.0.0.0:5000';

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player3 = io.connect(url, ioOptions);
    player1.on('connect', () => {
      player2.emit('changeName', 'player2');
      player2.emit('updateEquipment', equipment);
      player2.emit('updateEffects', {});
      player3.emit('teleport', TEST_ROOM);
      player3.emit('changeName', 'player3');
      player3.emit('updateEquipment', equipment);
      player3.emit('updateEffects', {});
      player1.emit('changeName', 'player1');
      player1.emit('updateEquipment', equipment);
      player1.emit('updateEffects', {});
      player1.emit('teleport', TEST_ROOM);
      player1.emit('updateSocket');
      player1.on('updateComplete', () => done());
    });
  });

  afterEach(done => {
    player1.disconnect();
    player2.disconnect();
    player3.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  describe('With a living target', () => {
    describe('Buffing a target', () => {
      describe('On another user', () => {
        it('should emit an addEffect message to the target', done => {
          player1.emit('skill', {
            enemy: 'player3',
            funcsToCall: [],
            skillCost: {
              stat: 'mp',
              value: 4
            },
            skillTypes: ['effect', 'buff'],
            echoLog: {target: {friendly: 'player3'}},
            combatLog: {target: {friendly: 'player3'}}
          });
          player3.on('addEffect', () => {
            done();
          });
        });
      });

      describe('On the same user', () => {
        it('should not emit anything  extra', done => {
          player1.emit('skill', {
            enemy: 'player1',
            funcsToCall: [addEffect],
            skillCost: {
              stat: 'mp',
              value: 4
            },
            skillTypes: ['effect', 'buff'],
            echoLog: {target: {friendly: 'player1'}},
            combatLog: {target: {friendly: 'player1'}}
          });
          player1.on('generalMessage', () => done());
        });
      });
    });

    describe('With a debuff skill', () => {
      describe('With an enemy not already affected', () => {
        it('should apply the skill', done => {
          player1.emit('kill', {target: 'zombie'});
          player1.on('enterCombat', res => {
            target = res;
            player1.emit('skill', {
              enemy: target,
              effectName: 'hobble',
              effects: {atk: -2, duration: 3},
              skillName: 'hobble',
              funcsToCall: [startCooldown],
              skillCost: {
                stat: 'mp',
                value: 3
              },
              skillTypes: ['effect', 'debuff'],
              echoLog: {},
              combatLog: {}
            });

            player1.on('generalMessage', res => {
              expect(res.combatLog).toEqual({});
              done();
            });
          });
        });
      });

      describe('With an enemy already affected by a skill with a duration', () => {
        it('should refresh the duration', done => {
          player1.emit('kill', {target: 'zombie'});
          player1.on('enterCombat', res => {
            target = res;
            player1.emit('skill', {
              enemy: target,
              effectName: 'hobble',
              effects: {atk: -2},
              skillName: 'hobble',
              funcsToCall: [startCooldown],
              skillCost: {
                stat: 'mp',
                value: 3
              },
              skillTypes: ['effect', 'debuff'],
              echoLog: {},
              combatLog: {}
            });

            player1.on('generalMessage', () => {
              player1.emit('skill', {
                enemy: target,
                effectName: 'hobble',
                effects: {atk: -2},
                skillName: 'hobble',
                funcsToCall: [startCooldown],
                skillCost: {
                  stat: 'mp',
                  value: 3
                },
                skillTypes: ['effect', 'debuff'],
                echoLog: {},
                combatLog: {}
              });

              player1.on('generalMessage', res => {
                expect(res.combatLog).toEqual({});
                done();
              });
            });
          });
        });
      });
    });

    describe('With a damage skill', () => {
      describe('Still alive after the skill', () => {
        it('should emit to the room a generalMessage with a combatLog', done => {
          player1.emit('kill', {target: 'zombie'});
          player1.on('enterCombat', res => {
            target = res;
            player2.emit('teleport', TEST_ROOM);
            player2.emit('updateSocket');
            player2.on('updateComplete', () => {
              player1.emit('skill', {enemy: target, skillTypes: ['physical', 'damage'], damage: 5, echoLog: {}});
              player2.on('generalMessage', response => {
                expect(response.combatLog).toEqual({});
                done();
              });
            });
          });
        });
      });

      describe('With enough damage to kill the target', () => {
        it('should call slayEnemy', done => {
          player1.emit('skill', {
            enemy: target,
            funcsToCall: [],
            skillCost: {
              stat: 'mp',
              value: 4
            },
            skillTypes: ['damage', 'physical'],
            damage: 20,
            echoLog: {}});
          player1.on('slayEnemy', res => {
            expect(res).toEqual({...target, hp: target.maxHP - 25, combat: {active: true, targets: ['player1']}});
            done();
          });
        });
      });
    });

    describe('With a target already dead', () => {
      describe('With a damage skill', () => {
        it('should return a slayEnemy event', done => {
          player1.emit('skill', {
            enemy: target,
            skillCost: {
              stat: 'mp',
              value: 4
            },
            funcsToCall: [],
            skillTypes: ['damage', 'physical'],
            damage: 20,
            echoLog: {}
          });
          player1.on('slayEnemy', res => {
            expect(res).toEqual(target);
            done();
          });
        });
      });

      describe('With a debuff skill', () => {
        it('should return a slayEnemy event', done => {
          player1.emit('skill', {
            enemy: target,
            skillCost: {
              stat: 'mp',
              value: 4
            },
            funcsToCall: [],
            skillTypes: ['effect', 'debuff'],
            echoLog: {}
          });
          player1.on('slayEnemy', res => {
            expect(res).toEqual(target);
            done();
          });
        });
      });
    });

    describe('With a healing skill', () => {
      describe('On a user not connected', () => {
        it('should return an error that the user isn\'t seen', done => {
          player1.emit('skill', {
            enemy: 'Davy',
            funcsToCall: [],
            skillCost: {
              stat: 'mp',
              value: 4
            },
            skillTypes: ['healing', 'magical'],
            damage: -5,
            echoLog: {},
            combatLog: {}
          });
          player1.on('generalMessage', res => {
            expect(res.feedback).toEqual('I don\'t see that person here.');
            done();
          });
        });
      });

      describe('On a valid target, but not in the room', () => {
        it('should return an error that the user isn\'t seen', done => {
          player1.emit('skill', {
            enemy: 'player2',
            funcsToCall: [],
            skillCost: {
              stat: 'mp',
              value: 4
            },
            skillTypes: ['healing', 'magical'],
            damage: -5,
            echoLog: {},
            combatLog: {}
          });
          player1.on('generalMessage', res => {
            expect(res.feedback).toEqual('I don\'t see that person here.');
            done();
          });
        });
      });

      describe('If the user is the target', () => {
        it('should change the combatLog accordingly', done => {
          player1.emit('skill', {
            enemy: 'player1',
            funcsToCall: [startCooldown],
            skillCost: {
              stat: 'mp',
              value: 4
            },
            skillTypes: ['healing', 'magical'],
            damage: -5,
            echoLog: {target: {}},
            combatLog: {target: {}}
          });
          player1.on('generalMessage', res => {
            expect(res.combatLog.target.friendly).toEqual('yourself');
            done();
          });
        });
      });

      describe('If another player is the target', () => {
        it('should emit the combatLog to the player', done => {
          player1.emit('skill', {
            enemy: 'player3',
            funcsToCall: [],
            skillCost: {
              stat: 'mp',
              value: 4
            },
            skillTypes: ['healing', 'magical'],
            damage: -5,
            echoLog: {target: {friendly: 'player3'}},
            combatLog: {target: {friendly: 'player3'}}
          });
          player1.on('generalMessage', res => {
            expect(res.combatLog.target.friendly).toEqual('player3');
            done();
          });
        });
      });
    });
  });

  describe('With a dead target', () => {
    beforeEach(done => {
      player2.emit('teleport', TEST_ROOM);
      player2.emit('updateEffects', {death: true});
      player2.emit('updateSocket');
      player2.on('updateComplete', () => done());
    });

    describe('With a healing skill', () => {
      it('should return that you can\'t heal ghosts', done => {
        player1.emit('skill', {
          enemy: 'player2',
          funcsToCall: [],
          skillCost: {
            stat: 'mp',
            value: 4
          },
          skillTypes: ['healing', 'magical'],
          damage: -5,
          echoLog: {target: {friendly: 'player2'}},
          combatLog: {target: {friendly: 'player2'}}
        });
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('You can\'t heal a ghost.');
          done();
        });
      });
    });

    describe('With a buff', () => {
      it('should return that "you can\'t target ghosts with that."', done => {
        player1.emit('skill', {
          enemy: 'player2',
          funcsToCall: [],
          skillCost: {
            stat: 'mp',
            value: 4
          },
          skillTypes: ['effect', 'buff'],
          echoLog: {target: {friendly: 'player2'}},
          combatLog: {target: {friendly: 'player2'}}
        });
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('You can\'t target ghosts with that.');
          done();
        });
      });
    });
  });
});
