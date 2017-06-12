'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {newMessage} from '../app/actions/message-actions.js';
import {CommandInput} from '../app/containers/command-input.jsx';

describe('<CommandInput />', () => {
  const props = {
    changeEnterStatus: sinon.spy(),
    socket: {
      emit: function() {}
    },
    input: 'say Test input',
    dispatch: sinon.spy(),
    prevCommands: [],
    tester: false
  };

  const commandInput = shallow(<CommandInput {...props} />);
  const handleCommandSpy = sinon.spy(commandInput.instance(), 'handleCommand');
  commandInput.instance().forceUpdate();

  it('should call the correct functions when enter is pressed', () => {
    commandInput.find('input').simulate('keyUp', {keyCode: 13});
    expect(handleCommandSpy.called).toEqual(true);
    expect(props.dispatch.calledWith(newMessage({playerInput: props.input}))).toEqual(true);
    expect(props.changeEnterStatus.calledWith(true)).toEqual(true);
  });
});
