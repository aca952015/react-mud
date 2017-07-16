'use strict';

import skillHandler from '../../app/handlers/skill-handler.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {startCooldown} from '../../app/actions/skill-actions.js';
import newMob from '../../app/data/mobs.js';
import newItem from '../../app/data/items.js';

describe('skillHandler', () => {
  const props = {
    skills: warriorSkills,
    effects: {death: false},
    globalCooldown: false,
    equipment,
    atk: 2,
    combat: {
      active: true,
      targets: [newMob('bat')]
    },
    username: 'Dave'
  };

  const response = {
    funcsToCall: [startCooldown, newMessage],
    skillName: 'slash',
    emitType: 'skill',
    damage: 3,
    enemy: props.combat.targets[0],
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
    it('should return a skillHandler response', () => {
      expect(skillHandler(props.skills['slash'], 'bat', props)).toEqual(response);
    });
  });

  describe('With equipment', () => {
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
});
