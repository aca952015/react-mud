'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {PlayerInput} from '../../app/components/player-input.jsx';

describe('<PlayerInput />', () => {
  let props = {
    message: {
      playerInput: 'say Ayyy'
    }
  };
  let playerInput = shallow(<PlayerInput {...props} />);
  it('should display a p tag with the player input', () => {
    expect(playerInput.find('p').text()).toEqual(props.message.playerInput);
  });
});
