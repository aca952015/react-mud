'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {PlayerDescription} from '../../app/components/player-description.jsx';

describe('<PlayerDescription />', () => {
  const props = {description: ['Paragraph1', 'Paragraph2']};
  const playerDesc = shallow(<PlayerDescription {...props} />);

  it('should render a ul with lis of each paragraph', () => {
    expect(playerDesc.find('li').first().text()).toEqual(props.description[0]);
    expect(playerDesc.find('li').last().text()).toEqual(props.description[1]);
  });
});
