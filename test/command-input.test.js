'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {CommandInput} from '../app/containers/command-input.jsx';

describe('<CommandInput />', () => {
  const props = {
    changeEnterStatus: function() {},
    socket: {
      emit: function() {}
    },
    input: 'say Test input',
    dispatch: function() {},
    prevCommands: []
  };

  const commandInput = shallow(<CommandInput {...props} />);
  const spy = sinon.spy(commandInput.instance(), 'handleCommand');
  commandInput.instance().forceUpdate();

  it('should call handleCommand when enter is pressed', () => {
    commandInput.find('input').simulate('keyUp', {keyCode: 13});
    expect(spy.called).toEqual(true);
  });
});
