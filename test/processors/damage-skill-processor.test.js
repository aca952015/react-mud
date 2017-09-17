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
import newItem from '../../app/data/items.js';

describe('skillHandler with a damage skill', () => {
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
    skillName: 'slash',
    emitType: 'skill',
    amount: -0,
    statToChange: 'sp',
    skillTypes: props.skills.slash.skillTypes,
    damage: 3,
    enemy: props.combat.targets[0],
    cooldownTimer: undefined,
    echoLog: {
      from: {
        friendly: props.username
      },
      pre: warriorSkills['slash'].roomEcho,
      damage: 3,
      post: ' damage to ',
      target: {
        enemy: props.combat.targets[0].short
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      pre: warriorSkills['slash'].playerEcho,
      damage: 3,
      post: ' damage to ',
      target: {
        enemy: props.combat.targets[0].short
      },
      punctuation: '.'
    }
  };

  describe('If the user is not in combat', () => {
    it('should return feedback saying "You aren\'t in combat."', () => {
      expect(skillHandler(props.skills['slash'], 'bat', {...props, combat: {active: false, targets: []}})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You aren\'t in combat.'
      });
    });
  });

  describe('Without arguments', () => {
    it('should randomly target an enemy the user is fighting', () => {
      expect(skillHandler(props.skills['slash'], undefined, props)).toEqual(response);
    });
  });

  describe('With args, but an enemy the user isn\'t fighting', () => {
    it('should return feedback saying "You don\'t appear to be fighting that."', () => {
      expect(skillHandler(props.skills['slash'], 'zombie', props)).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You don\'t appear to be fighting that.'
      });
    });
  });

  describe('With args on an enemy the user is fighting', () => {
    describe('With enough MP or SP to use it', () => {
      it('should return a skillHandler response', () => {
        expect(skillHandler(props.skills['slash'], 'bat', props)).toEqual(response);
      });
    });


    describe('Without enough', () => {
      it('should return an error of not being able to use it', () => {
        expect(skillHandler(props.skills['slash'], 'bat', {...props, sp: 0})).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You don\'t have enough SP to do that.'
        });
      });
    });
  });

  describe('With equipment', () => {
    describe('With a physical skill', () => {
      it('should amplify a damaging skill\'s damage', () => {
        expect(skillHandler(props.skills['slash'], 'bat', {...props, equipment: {...props.equipment, 'main hand': newItem('weapons', 'broad sword')}}))
        .toEqual({
          ...response,
          damage: 8,
          echoLog: {...response.echoLog, damage: 8},
          combatLog: {...response.combatLog, damage: 8}
        });
      });
    });

    describe('With a magical skill', () => {
      let bat = newMob('bat', 'Test - Nexus');

      it('should amplify a damaging skill\'s damage', () => {
        expect(skillHandler(props.skills['searing light'], 'bat', {
          ...props,
          equipment: {
            ...props.equipment,
            'main hand': newItem('weapons', 'holy mace'),
            'head': {
              ...newItem('equipment', 'leather helm'),
              stats: {
                mdf: 5,
                def: 5
              }
            }
          },
          combat: {
            active: true,
            targets: [bat]
          }
        }))
        .toEqual({
          ...response,
          enemy: bat,
          skillName: 'searing light',
          damage: 11,
          skillTypes: ['damage', 'magical'],
          echoLog: {
            ...response.echoLog,
            pre: clericSkills['searing light'].roomEcho,
            post: clericSkills['searing light'].postMessage,
            target: {enemy: bat.short},
            damage: 11
          },
          combatLog: {
            ...response.combatLog,
            pre: clericSkills['searing light'].playerEcho,
            post: clericSkills['searing light'].postMessage,
            target: {enemy: bat.short},
            damage: 11
          }
        });
      });
    });
  });

  describe('Against an enemy with high def', () => {
    let zombie = newMob('armored zombie', 'Test - Nexus');
    it('should return a response with 1 damage', () => {
      expect(skillHandler(props.skills['slash'], 'zom', {...props, combat: {...props.combat, targets: [zombie]}})).toEqual({
        ...response,
        enemy: zombie,
        damage: 1,
        echoLog: {...response.echoLog, target: {enemy: zombie.short}, damage: 1},
        combatLog: {...response.combatLog, target: {enemy: zombie.short}, damage: 1}
      });
    });
  });

  describe('Against an enemy with high mdf', () => {
    describe('With enough resources to cast', () => {
      let zombie = newMob('armored zombie', 'Test - Nexus');
      zombie.mdf = 30;
      it('should return a response with 1 damage', () => {
        expect(skillHandler(props.skills['searing light'], 'zombie', {...props, combat: {...props.combat, targets: [zombie]}})).toEqual({
          ...response,
          enemy: zombie,
          skillName: 'searing light',
          damage: 1,
          skillTypes: ['damage', 'magical'],
          echoLog: {
            ...response.echoLog,
            pre: clericSkills['searing light'].roomEcho,
            post: clericSkills['searing light'].postMessage,
            target: {enemy: zombie.short},
            damage: 1
          },
          combatLog: {
            ...response.combatLog,
            pre: clericSkills['searing light'].playerEcho,
            post: clericSkills['searing light'].postMessage,
            target: {enemy: zombie.short},
            damage: 1
          }
        });
      });
    });
  });

  describe('With a skill that has a cooldownTimer', () => {
    it('should return a response object with a cooldownTimer property', () => {
      expect(skillHandler({...props.skills['slash'], cooldownTimer: 500}, 'bat', props)).toEqual({
        ...response,
        cooldownTimer: 500
      });
    });
  });
});
