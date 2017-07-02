'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Prompt} from '../../app/components/prompt.jsx';

describe('<Prompt />', () => {
  let props = {
    hp: 15,
    maxHP: 20,
    mp: 18,
    maxMP: 25
  };
  let prompt = shallow(<Prompt {...props} />);

  it('should display a P tag containing spans with the current and max HP values', () => {
    expect(prompt.find('p').first().children('span').first().text()).toEqual(`${props.hp}`);
    expect(prompt.find('p').first().children('span').at(1).text()).toEqual(' / ');
    expect(prompt.find('p').first().children('span').last().text()).toEqual(`${props.maxHP}`);
  });

  it('should display a P tag containing spans with the current and max MP values', () => {
    expect(prompt.find('p').at(1).children('span').first().text()).toEqual(`${props.mp}`);
    expect(prompt.find('p').at(1).children('span').at(1).text()).toEqual(' / ');
    expect(prompt.find('p').at(1).children('span').last().text()).toEqual(`${props.maxMP}`);
  });
});
