'use strict';

import {shallow} from 'enzyme';
import React from 'react';
import {Effects} from '../../app/components/effects.jsx';

describe('<Effects />', () => {
  const props = {
    effects: {
      infusion: {
        mat: 3,
        atk: 3
      }
    }
  };
  const effects = shallow(<Effects {...props} />);

  it('should render an effectBlock for each effect', () => {
    expect(effects.find('.effect-block').children('p').text()).toEqual('Infusion');
    expect(effects.find('.effect-block').children('ul').first().children('li').last().children('span').last().text()).toEqual('+3');
    expect(effects.find('.effect-block').children('ul').first().children('li').last().children('span').first().text()).toEqual('Atk: ');
  });
});
