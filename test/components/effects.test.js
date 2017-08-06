'use strict';

import {shallow} from 'enzyme';
import React from 'react';
import {Effects} from '../../app/components/effects.jsx';

describe('<Effects />', () => {
  const props = {
    effects: {
      infusion: {
        mat: -3,
        atk: 3,
        duration: 1
      }
    }
  };
  let effects = shallow(<Effects {...props} />);

  it('should render an effectBlock for each effect', () => {
    expect(effects.find('.effect-block').children('p').text()).toEqual('Infusion (1 tick)');
    expect(effects.find('.effect-block').children('ul').first().children('li').last().children('span').last().text()).toEqual('+3');
    expect(effects.find('.effect-block').children('ul').first().children('li').last().children('span').first().text()).toEqual('Atk: ');
  });

  it('should render the word "ticks" if the duration is greater than 1', () => {
    props.effects.infusion.duration = 2;
    effects = shallow(<Effects {...props} />);

    expect(effects.find('.effect-block').children('p').text()).toEqual('Infusion (2 ticks)');
  });

  it('should not render ticks if there isn\'t a duration', () => {
    props.effects = {death: true};
    effects = shallow(<Effects {...props} />);
    expect(effects.find('.effect-block').children('p').text()).toEqual('Death ');
  });
});
