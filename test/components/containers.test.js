'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Containers} from '../../app/components/containers.jsx';
import newItem from '../../app/data/items.js';

describe('<Containers />', () => {
  let props = {
    message: {
      containedItems: [newItem('potions', 'health potion'), newItem('keys', 'gallows key'), newItem('potions', 'mana potion'), newItem('potions', 'mana potion')]
    }
  };

  let containers = shallow(<Containers {...props} />);

  it('should render an h3 that says "You look inside and see:"', () => {
    expect(containers.find('h3').text()).toEqual('You look inside and see:');
  });

  it('should render a ul with an li for each item', () => {
    expect(containers.find('li').first().text()).toEqual(props.message.containedItems[0].short);
    expect(containers.find('li').at(1).text()).toEqual(props.message.containedItems[1].short);
  });

  it('should render parenthetical counts for multiples of the same item', () => {
    expect(containers.find('li').last().text()).toEqual(`(2) ${props.message.containedItems[2].short}`);
  });

  it('should render a ul with an li that says "nothing" if there is nothing', () => {
    props = {
      message: {
        containedItems: []
      }
    };
    containers = shallow(<Containers {...props} />);

    expect(containers.find('li').text()).toEqual('Nothing');
  });

});
