'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import newMob from '../../app/data/mobs.js';
import {Mobs} from '../../app/components/mobs.jsx';

describe('<Mobs />', () => {
  let props = {
    message: {
      mobs: [newMob('bat')]
    }
  };

  let mobs = shallow(<Mobs {...props} />);

  it('should return a UL element with mobs as li elements', () => {
    expect(mobs.find('li').text()).toEqual(props.message.mobs[0].long);
  });
});
