'use strict';

import sinon from 'sinon';
import skillHandler from '../../app/handlers/skill-handler.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {clericSkills} from '../../app/data/skills/cleric-skills.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {startCooldown} from '../../app/actions/skill-actions.js';
import {changeStat} from '../../app/actions/user-actions.js';
import {addEffect} from '../../app/actions/combat-actions.js';
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
      targets: [newMob('bat')]
    },
    username: 'Dave',
    dispatch: sinon.spy()
  };

  const response = {
    funcsToCall: [],
    statToChange: 'sp',
    effectName: 'infusion',
    effects: {atk: 3, mat: 3, duration: 2},
    expirationMessage: 'You no longer feel a holy infusion of might.',
    amount: -(3),
    skillName: 'infusion',
    applyFunction: clericSkills['infusion'].applyFunction,
    expireFunction: clericSkills['infusion'].expireFunction,
    skillCost: {stat: 'mp', value: 3},
    emitType: 'skill',
    skillTypes: ['effect', 'buff'],
    enemy: props.username,
    cooldownTimer: undefined,
    echoLog: {
      from: {
        friendly: props.username
      },
      interaction: ' unleashes a holy infusion of might towards ',
      target: {
        friendly: props.username
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      interaction: ' unleash a holy infusion of might towards ',
      target: {
        friendly: props.username
      },
      punctuation: '.'
    }
  };

  describe('If the user is not in combat', () => {
    describe('On another player', () => {
      it('should return an object with a target of the args', () => {
        expect(skillHandler(props.skills['infusion'], 'Bob', props)).toEqual({
          ...response,
          enemy: 'Bob',
          echoLog: {
            ...response.echoLog,
            target: {friendly: 'Bob'}
          },
          combatLog: {
            ...response.combatLog,
            target: {friendly: 'Bob'}
          }
        });
      });
    });

    describe('On the user', () => {
      describe('With the skill not already applied', () => {
        it('should return the response', () => {
          expect(skillHandler(props.skills['infusion'], 'Dave', props)).toEqual({
            ...response,
            funcsToCall: [startCooldown, changeStat, addEffect]
          });
        });
      });

      describe('With a skill already applied', () => {
        expect(skillHandler(props.skills['infusion'], 'Dave', {...props, effects: {death: false, infusion: {atk: 3, mat: 3, duration: 2}}}))
        .toEqual(response);
      });

      describe('With a skill that doesn\'t have a duration', () => {
        it('should not not call refreshDuration', () => {
          expect(skillHandler(props.skills['infusion'], 'Dave', {...props, effects: {infusion: {atk: 3, mat: 3}}})).toEqual(response);
        });
      });
    });
  });

  describe('In combat', () => {
    describe('On an enemy', () => {
      it('should return feedback saying "You can\'t use that on enemies."', () =>  {
        expect(skillHandler(props.skills['infusion'], 'bat', {...props, combat: {active: true, targets: [newMob('bat')]}})).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You can\'t use that on enemies.'
        });
      });
    });
  });

  describe('Without arguments', () => {
    describe('Using an effect skill', () => {
      it('should return the response', () => {
        expect(skillHandler(props.skills['infusion'], undefined, props)).toEqual({
          ...response,
          funcsToCall: [startCooldown, changeStat, addEffect]
        });
      });
    });
  });

  describe('With not enough MP', () =>  {
    it('should return that the user doesn\'t have enough MP', () => {
      expect(skillHandler(props.skills['infusion'], undefined, {...props, mp: 0})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You don\'t have enough MP to use that.'
      });
    });
  });

  describe('With a cooldown timer', () => {
    it('should return an response with a cooldown timer', () => {
      expect(skillHandler({...props.skills['infusion'], cooldownTimer: 5000}, undefined, props)).toEqual({
        ...response,
        funcsToCall: [startCooldown, changeStat, addEffect],
        cooldownTimer: 5000
      });
    });
  });
});
