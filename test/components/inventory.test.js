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

  it('should render each unique item in the inventory as a separate li', () => {
    props = {
      inventory: [
        {
          name: 'Item 1',
          short: 'Item 1 short'
        },
        {
          name: 'Item 2',
          short: 'Item 2 short'
        }
      ]
    };
    inventory = shallow(<Inventory {...props} />);
    expect(inventory.find('li').at(0).text()).toEqual(props.inventory[0].short);
    expect(inventory.find('li').at(1).text()).toEqual(props.inventory[1].short);
  });

  it('should render (#) if there are multiples of the same item in the inventory', () => {
    props = {
      inventory: [
        {
          name: 'Item 1',
          short: 'Item 1 short'
        },
        {
          name: 'Item 2',
          short: 'Item 2 short'
        },
        {
          name: 'Item 1',
          short: 'Item 1 short'
        }
      ]
    };
    inventory = shallow(<Inventory {...props} />);
    expect(inventory.find('li').at(0).text()).toEqual(`(2) ${props.inventory[0].short}`);
    expect(inventory.find('li').at(1).text()).toEqual(props.inventory[1].short);
    expect(inventory.find('li').at(2).node).toEqual(undefined);
  });
});
