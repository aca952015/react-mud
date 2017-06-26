'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {CombatLog} from '../../app/components/combat-log.jsx';

describe('<CombatLog />', () => {
  let props, combatLog;

  describe('With a basic interaction from a user against a target', () => {
    it('should contain the text "You do some stuff to test target."', () => {
      props = {
        message: {
          combatLog: {
            from: {
              friendly: 'You'
            },
            interaction: ' do some stuff to ',
            target: {
              enemy: 'test target',
            },
            punctuation: '.'
          }
        }
      };
      combatLog = shallow(<CombatLog {...props} />);

      expect(combatLog.find('p').text()).toEqual('You do some stuff to test target.');
      expect(combatLog.find('.from-friendly').text()).toEqual('You');
      expect(combatLog.find('span').at(1).text()).toEqual(' do some stuff to ');
      expect(combatLog.find('.target-enemy').text()).toEqual('test target');
      expect(combatLog.find('span').last().text()).toEqual('.');
    });
  });

  describe('With a basic interaction from a target against a user', () => {
    it('should contain the text "Some dude targets you."', () => {
      props = {
        message: {
          combatLog: {
            from: {
              enemy: 'Some dude'
            },
            interaction: ' targets ',
            target: {
              friendly: 'you'
            },
            punctuation: '.'
          }
        }
      };
      combatLog = shallow(<CombatLog {...props} />);

      expect(combatLog.find('p').text()).toEqual('Some dude targets you.');
      expect(combatLog.find('.from-enemy').text()).toEqual('Some dude');
      expect(combatLog.find('.target-friendly').text()).toEqual('you');
      expect(combatLog.find('span').at(1).text()).toEqual(' targets ');
    });
  });

  describe('With damage from user to a target', () => {
    it('should contain the text "You deal 2 damage to target."', () => {
      props = {
        message: {
          combatLog: {
            from: {
              friendly: 'You'
            },
            pre: ' deal ',
            damage: 2,
            post: ' damage to ',
            target: {
              enemy: 'target'
            },
            punctuation: '.'
          }
        }
      };
      combatLog = shallow(<CombatLog {...props} />);

      expect(combatLog.find('p').text()).toEqual('You deal 2 damage to target.');
      expect(combatLog.find('.from-friendly').text()).toEqual('You');
      expect(combatLog.find('.target-enemy').text()).toEqual('target');
      expect(combatLog.find('span').children('span').first().text()).toEqual(' deal ');
      expect(combatLog.find('span').children('span').at(1).text()).toEqual('2');
      expect(combatLog.find('span').children('span').at(2).text()).toEqual(' damage to ');
    });
  });

  describe('With damage from a target to a user', () => {
    it('should contain the text "Target deals 2 damage to you."', () => {
      props = {
        message: {
          combatLog: {
            from: {
              enemy: 'Target'
            },
            pre: ' deals ',
            damage: 2,
            post: ' damage to ',
            target: {
              friendly: 'you'
            },
            punctuation: '.'
          }
        }
      };
      combatLog = shallow(<CombatLog {...props} />);

      expect(combatLog.find('p').text()).toEqual('Target deals 2 damage to you.');
    });
  });
});
