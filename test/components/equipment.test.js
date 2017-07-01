'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Equipment} from '../../app/components/equipment.jsx';
import newItem from '../../app/data/items.js';

describe('<Equipment />', () => {
  let props, eq;

  it('should return a UL with Nothing in slots that are null and shorts in slots that have an item', () => {
    props = {
      equipment: {
        head: newItem('leather helm', 'equipment'),
        shoulders: null,
        chest: null,
        legs: null,
        feet: null
      }
    };

    eq = shallow(<Equipment {...props} />);

    expect(eq.find('h3').text()).toEqual('You are wearing:');
    expect(eq.find('li').first().text()).toEqual(`<Head> ${props.equipment.head.short}`);
    expect(eq.find('li').at(1).text()).toEqual('<Shoulders> Nothing');
    expect(eq.find('li').at(2).text()).toEqual('<Chest> Nothing');
    expect(eq.find('li').at(3).text()).toEqual('<Legs> Nothing');
    expect(eq.find('li').last().text()).toEqual('<Feet> Nothing');
    expect(eq.find('li').first().children('span').text()).toEqual(props.equipment.head.short);
  });

  describe('With a name', () => {
    it('should show "Bob is wearing:"', () => {
      props = {...props, name: 'Bob'};
      eq = shallow(<Equipment {...props} />);

      expect(eq.find('h3').text()).toEqual('Bob is wearing:');
    });
  });
});
