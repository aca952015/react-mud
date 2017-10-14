'use strict';

import sinon from 'sinon';
import skillHandler from '../../app/handlers/skill-handler.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {clericSkills} from '../../app/data/skills/cleric-skills.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {startCooldown} from '../../app/actions/skill-actions.js';
import {changeStat} from '../../app/actions/user-actions.js';
import newMob from '../../app/data/mobs.js';

describe('skillHandler', () => {
  const props = {
    skills: {
      ...warriorSkills,
      ...clericSkills
    },
    effects: {death: false},
    globalCooldown: false,
    equipment,
    atk: 2,
    mat: 2,
    def: 0,
    mdf: 0,
    mp: 5,
    combat: {
      active: true,
      targets: [newMob('bat', 'Test - Nexus')]
    },
    username: 'Dave',
    dispatch: sinon.spy()
  };

  const response = {
    funcsToCall: [startCooldown, changeStat],
    skillName: 'heal',
    emitType: 'skill',
    skillCost: {
      stat: 'mp',
      value: 4
    },
    statToChange: 'sp',
    amount: -3,
    skillTypes: props.skills.heal.skillTypes,
    damage: -3,
    cooldownTimer: undefined,
    enemy: props.username,
    echoLog: {
      from: {
        friendly: props.username
      },
      pre: clericSkills['heal'].roomEcho,
      damage: -3,
      post: ' health to ',
      target: {
        friendly: props.username
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      pre: clericSkills['heal'].playerEcho,
      damage: -3,
      post: ' health to ',
      target: {
        friendly: props.username
      },
      punctuation: '.'
    }
  };

  describe('If the user is not in combat', () => {
    it('should return the response object', () => {
      expect(skillHandler(props.skills['heal'], undefined, {...props, combat: {active: false, targets: []}})).toEqual(response);
    });
  });

  describe('Without arguments', () => {
    it('should target the user', () => {
      expect(skillHandler(props.skills['heal'], undefined, props)).toEqual(response);
    });
  });

  describe('With arguments', () => {
    describe('and the target is the user', () => {
      it('should return a response object', () => {
        expect(skillHandler(props.skills['heal'], props.username, props)).toEqual(response);
      });
    });

    describe('And the target is not the user', () => {
      it('should make the target a camelcased version of args for the server to handle', () => {
        expect(skillHandler(props.skills['heal'], 'bob', props)).toEqual({
          ...response,
          funcsToCall: [],
          enemy: 'Bob',
          combatLog: {
            ...response.combatLog,
            target: {
              friendly: 'Bob'
            }
          },
          echoLog: {
            ...response.echoLog,
            target: {
              friendly: 'Bob'
            }
          }
        });
      });
    });

    describe('On an enemy the user is fighting', () => {
      it('should return an error that the user can\'t heal enemies', () => {
        expect(skillHandler(props.skills['heal'], 'bat', props)).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You can\'t heal enemies.'
        });
      });
    });
  });

  describe('Without enough resources', () => {
    it('should return an error of not having enough MP', () => {
      expect(skillHandler(props.skills['heal'], undefined, {...props, mp: 0})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You don\'t have enough MP to use that.'
      });
    });
  });

  describe('With an ability with a cooldown', () => {
    it('should return a cooldownTimer of the cooldownTimer', () => {
      expect(skillHandler({...props.skills['heal'], cooldownTimer: 5000}, undefined, props)).toEqual({
        ...response,
        cooldownTimer: 5000
      });
    });
  });

  describe('With a negative value', () => {
    it('should heal for at least 1', () => {
      expect(skillHandler(props.skills['heal'], undefined, {...props, mat: -10})).toEqual({
        ...response,
        damage: -1,
        echoLog: {
          ...response.echoLog,
          damage: -1
        },
        combatLog: {
          ...response.combatLog,
          damage: -1
        }
      });
    });
  });
});
