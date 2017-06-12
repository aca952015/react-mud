'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {CommandInput} from '../app/containers/command-input.jsx';

describe('<CommandInput />', () => {
  const props = {
    changeEnterStatus: function(bool) {
      props.tester = bool;
    },
    socket: {
      emit: function() {}
    },
    input: 'say Test input',
    dispatch: function() {},
    prevCommands: [],
    tester: false
  };

  const commandInput = shallow(<CommandInput {...props} />);
  const handleCommandSpy = sinon.spy(commandInput.instance(), 'handleCommand');
  commandInput.instance().forceUpdate();

  it('should call handleCommand when enter is pressed', () => {
    commandInput.find('input').simulate('keyUp', {keyCode: 13});
    expect(handleCommandSpy.called).toEqual(true);
    expect(props.tester).toEqual(true);
  });
});
