'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {newMessage, updatePrevCommands, updateCommandIndex, updateInput, truncatePrevCommands} from '../app/actions/message-actions.js';
import {CommandInput} from '../app/containers/command-input.jsx';

describe('<CommandInput />', () => {
  let props, commandInput;
  beforeEach(done => {
    props = {
      changeEnterStatus: sinon.spy(),
      socket: {
        emit: sinon.spy()
      },
      input: 'say Test input',
      dispatch: sinon.spy(),
      prevCommands: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21'],
      commandIndex: 1,
      username: 'Tester'
    };
    commandInput = shallow(<CommandInput {...props} />);
    done();
  });

  it('should call the correct functions when enter is pressed', () => {
    const handleCommandSpy = sinon.spy(commandInput.instance(), 'handleCommand');
    commandInput.instance().forceUpdate();
    let result = {
      from: props.username,
      text: 'Test input',
      emitType: 'say',
      funcsToCall: [newMessage],
      commType: ' say, '
    };
    commandInput.find('input').simulate('keyUp', {keyCode: 13});
    expect(handleCommandSpy.called).toEqual(true);
    expect(props.changeEnterStatus.calledWith(true)).toEqual(true);
    expect(props.dispatch.calledWith(newMessage({playerInput: props.input}))).toEqual(true);
    expect(props.dispatch.calledWith(updatePrevCommands(props.input))).toEqual(true);
    expect(props.dispatch.calledWith(updateCommandIndex(-(props.commandIndex)))).toEqual(true);
    expect(props.dispatch.calledWith(newMessage(result))).toEqual(true);
    expect(props.socket.emit.calledWith('say', result)).toEqual(true);
    expect(props.dispatch.calledWith(updateInput(''))).toEqual(true);
    expect(props.dispatch.calledWith(truncatePrevCommands())).toEqual(true);
  });

  it('should not call updatePrevCommands if the command is the same', () => {
    props.prevCommands.push(props.input);
    commandInput.find('input').simulate('keyUp', {keyCode: 13});
    expect(props.dispatch.calledWith(updatePrevCommands(props.input))).toEqual(false);
  });

  it('should update prevCommands from the end of the prevCommands array when up is pressed', () => {
    commandInput.find('input').simulate('keyUp', {keyCode: 38});
    expect(props.dispatch.calledWith(updateCommandIndex(1))).toEqual(true);
  });

  it('should update prevCommands by decrementing 1 when down is pressed', () => {
    commandInput.find('input').simulate('keyUp', {keyCode: 40});
    expect(props.dispatch.calledWith(updateInput(''))).toEqual(true);
  });
});
