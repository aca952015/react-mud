'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Occupants} from '../../app/components/occupants.jsx';

describe('<Occupants />', () => {
  let props = {
    username: 'TestR',
    message: {
      occupants: ['SomeDude', 'Tester']
    }
  };
  let occupants = shallow(<Occupants {...props} />);

  it('should display a list of occupants other than the user as a ul', () => {
    expect(occupants.find('li').children('span').at(0).text()).toEqual(props.message.occupants[0]);
    expect(occupants.find('li').children('span').at(1).text()).toEqual(props.message.occupants[1]);
    expect(occupants.find('li').at(0).text()).toEqual(`${props.message.occupants[0]} is here.`);
    expect(occupants.find('li').at(1).text()).toEqual(`${props.message.occupants[1]} is here.`);
  });
});
