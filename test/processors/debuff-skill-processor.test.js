'use strict';

import sinon from 'sinon';
import skillHandler from '../../app/handlers/skill-handler.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {startCooldown} from '../../app/actions/skill-actions.js';
import {changeStat} from '../../app/actions/user-actions.js';
import newMob from '../../app/data/mobs.js';

describe('skillHandler with a debuff skill', () => {
  const props = {
    skills: warriorSkills,
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
  const skill = warriorSkills['hobble'];

  const response = {
    funcsToCall: [startCooldown, changeStat],
    statToChange: 'sp',
    effectName: skill.addEffect.effectName,
    effects: skill.addEffect.effects,
    amount: -(skill.generateSP),
    skillName: skill.skillName,
    skillCost: skill.cost,
    generateSP: -(skill.generateSP),
    emitType: 'skill',
    skillTypes: skill.skillTypes,
    enemy: props.combat.targets[0],
    cooldownTimer: skill.cooldownTimer ? skill.cooldownTimer : undefined,
    echoLog: {
      from: {
        friendly: props.username
      },
      interaction: skill.roomEcho,
      target: {
        enemy: props.combat.targets[0].short
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      interaction: skill.playerEcho,
      target: {
        enemy: props.combat.targets[0].short
      },
      punctuation: '.'
    }
  };

  describe('If the user is not in combat', () => {
    it('should respond that the user isn\'t in combat', () => {
      expect(skillHandler(props.skills['hobble'], 'bat', {...props, combat: {active: false, targets: []}})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You aren\'t in combat.'
      });
    });
  });

  describe('Without arguments', () => {
    describe('Using a debuff', () => {
      it('should return the response', () => {
        expect(skillHandler(props.skills['hobble'], undefined, props)).toEqual(response);
      });
    });

    describe('Without enough resources', () => {
      it('should return an error of not having MP', () => {
        expect(skillHandler(props.skills['hobble'], undefined, {...props, mp: 0})).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You don\'t have enough MP to use that.'
        });
      });
    });
  });

  describe('With args, but an enemy the user isn\'t fighting', () => {
    describe('With a debuff skill', () => {
      it('should return feedback saying "You don\'t appear to be fighting that."', () => {
        expect(skillHandler(props.skills['hobble'], 'zombie', props)).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You don\'t appear to be fighting that.'
        });
      });
    });
  });

  describe('Without a cooldown timer', () => {
    it('should return the response', () => {
      expect(skillHandler(props.skills['hobble'], 'bat', props)).toEqual(response);
    });
  });

  describe('With a cooldown timer', () => {
    it('should return the response with a cooldown', () => {
      expect(skillHandler({...props.skills['hobble'], cooldownTimer: 500}, undefined, props)).toEqual({...response, cooldownTimer: 500});
    });
  });
});
