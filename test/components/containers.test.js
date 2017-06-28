'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Containers} from '../../app/components/containers.jsx';
import newItem from '../../app/data/items.js';

describe('<Containers />', () => {
  let props = {
    message: {
      containedItems: [newItem('health potion'), newItem('gallows key')]
    }
  };

  let containers = shallow(<Containers {...props} />);

  it('should render an h3 that says "You look inside and see:"', () => {
    expect(containers.find('h3').text()).toEqual('You look inside and see:');
  });

  it('should render a ul with an li for each item', () => {
    expect(containers.find('li').first().text()).toEqual('a red potion');
    expect(containers.find('li').last().text()).toEqual('a small black key');
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
