'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {CombatLog} from '../../app/components/combat-log.jsx';

describe('<CombatLog />', () => {
  let props, combatLog;

  describe('With a basic interaction from a user against a target', () => {
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

    it('should contain the text "You do some stuff to test target."', () => {
      expect(combatLog.find('p').text()).toEqual('You do some stuff to test target.');
    });
  });
});
