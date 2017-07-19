'use strict';

import skillHandler from '../../app/handlers/skill-handler.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {clericSkills} from '../../app/data/skills/cleric-skills.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {startCooldown} from '../../app/actions/skill-actions.js';
import newMob from '../../app/data/mobs.js';
import newItem from '../../app/data/items.js';

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
    combat: {
      active: true,
      targets: [newMob('bat')]
    },
    username: 'Dave'
  };

  const response = {
    funcsToCall: [startCooldown],
    skillName: 'slash',
    emitType: 'skill',
    skillTypes: props.skills.slash.skillTypes,
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

  const healingResponse = {
    funcsToCall: [startCooldown],
    skillName: 'heal',
    emitType: 'skill',
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
    describe('Using a damage skill', () => {
      it('should return feedback saying "You aren\'t in combat."', () => {
        expect(skillHandler(props.skills['slash'], 'bat', {...props, combat: {active: false, targets: []}})).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You aren\'t in combat.'
        });
      });
    });

    describe('Using a healing skill', () => {
      it('should return the healingResponse object', () => {
        expect(skillHandler(props.skills['heal'], undefined, {...props, combat: {active: false, targets: []}})).toEqual(healingResponse);
      });
    });
  });

  describe('Without arguments', () => {
    describe('Using a damage skill', () => {
      it('should randomly target an enemy the user is fighting', () => {
        expect(skillHandler(props.skills['slash'], undefined, props)).toEqual(response);
      });
    });

    describe('Using a healing skill', () => {
      it('should target the user', () => {
        expect(skillHandler(props.skills['heal'], undefined, props)).toEqual(healingResponse);
      });
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

  describe('Healing a target', () => {
    describe('and the target is the user', () => {
      it('should return a healingResponse object', () => {
        expect(skillHandler(props.skills['heal'], props.username, props)).toEqual(healingResponse);
      });
    });
  });

  describe('With args on an enemy the user is fighting', () => {
    describe('With a damage skill', () => {
      it('should return a skillHandler response', () => {
        expect(skillHandler(props.skills['slash'], 'bat', props)).toEqual(response);
      });
    });

    describe('With a healing skill', () => {
      it('should return an error that the user can\'t heal enemies', () => {
        expect(skillHandler(props.skills['heal'], 'bat', props)).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You can\'t heal enemies.'
        });
      });
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

  describe('Against an enemy with high def', () => {
    let zombie = newMob('armored zombie');
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

  describe('With a skill that has a cooldownTimer', () => {
    it('should return a response object with a cooldownTimer property', () => {
      expect(skillHandler({...props.skills['slash'], cooldownTimer: 500}, 'bat', props)).toEqual({
        ...response,
        cooldownTimer: 500
      });
    });
  });
});
