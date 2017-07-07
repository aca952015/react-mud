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
        head: newItem('equipment', 'leather helm'),
        shoulders: null,
        mainHand: null,
        offHand: null,
        chest: null,
        legs: null,
        feet: null
      }
    };

    eq = shallow(<Equipment {...props} />);

    expect(eq.find('h3').text()).toEqual('You are wearing:');
    expect(eq.find('ul').first().children('li').first().text()).toEqual('<Head>');
    expect(eq.find('ul').first().children('li').at(1).text()).toEqual('<Shoulders>');
    expect(eq.find('ul').first().children('li').at(2).text()).toEqual('<Main Hand>');
    expect(eq.find('ul').first().children('li').at(3).text()).toEqual('<Off Hand>');
    expect(eq.find('ul').first().children('li').at(4).text()).toEqual('<Chest>');
    expect(eq.find('ul').first().children('li').at(5).text()).toEqual('<Legs>');
    expect(eq.find('ul').first().children('li').last().text()).toEqual('<Feet>');
    expect(eq.find('ul').last().children('li').first().text()).toEqual(props.equipment.head.short);
    expect(eq.find('ul').last().children('li').at(1).text()).toEqual('Nothing');
    expect(eq.find('ul').last().children('li').at(2).text()).toEqual('Nothing');
    expect(eq.find('ul').last().children('li').at(3).text()).toEqual('Nothing');
    expect(eq.find('ul').last().children('li').last().text()).toEqual('Nothing');
  });

  describe('With a name', () => {
    it('should show "Bob is wearing:"', () => {
      props = {...props, name: 'Bob'};
      eq = shallow(<Equipment {...props} />);

      expect(eq.find('h3').text()).toEqual('Bob is wearing:');
    });
  });
});
