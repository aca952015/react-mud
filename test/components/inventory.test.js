'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Inventory} from '../../app/components/inventory.jsx';

describe('<Inventory />', () => {
  let props, inventory;

  it('should render an UL with a single <li> component saying "nothing" if inventory is empty', () => {
    props = {
      inventory: []
    };
    inventory = shallow(<Inventory {...props} />);
    expect(inventory.find('h3').text()).toEqual('You are carrying:');
    expect(inventory.find('li').text()).toEqual('Nothing');
  });
});
