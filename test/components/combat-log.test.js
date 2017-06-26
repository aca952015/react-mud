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
    });
  });
});
