'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {newMessage, updatePrevCommands, updateCommandIndex, updateInput, truncatePrevCommands} from '../../app/actions/message-actions.js';
import {CommandInput} from '../../app/containers/command-input.jsx';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {startGlobalCooldown} from '../../app/actions/skill-actions.js';
import newMob from '../../app/data/mobs.js';

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
      username: 'Tester',
      effects: {},
      equipment,
      combat: {
        active: false,
        targets: []
      },
      skills: warriorSkills
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

  it('should update input to an empty string when commandIndex is 1 and down is pressed', () => {
    commandInput.find('input').simulate('keyUp', {keyCode: 40});
    expect(props.dispatch.calledWith(updateInput(''))).toEqual(true);
  });

  it('should update input by decrementing prevCommands by 1 when down is pressed', () => {
    props.commandIndex = 2;
    commandInput = shallow(<CommandInput {...props} />);
    commandInput.find('input').simulate('keyUp', {keyCode: 40});
    expect(props.dispatch.calledWith(updateCommandIndex(-1))).toEqual(true);
  });

  it('should call saveCharacter if the emitType of the result is quit', () => {
    const quitProps = {...props, input: 'quit'};
    commandInput = shallow(<CommandInput {...quitProps} />);
    const saveCharacterStub = sinon.stub(commandInput.instance(), 'saveCharacter');
    commandInput.instance().forceUpdate();
    commandInput.find('input').simulate('keyUp', {keyCode: 13});
    expect(saveCharacterStub.called).toEqual(true);
  });

  describe('If a skill is called', () => {
    it('should dispatch startGlobalCooldown', () => {
      const skillProps = {...props, input: 'slash', combat: {active: true, targets: [newMob('bat')]}};
      commandInput = shallow(<CommandInput {...skillProps} />);
      commandInput.find('input').simulate('keyUp', {keyCode: 13});
      expect(skillProps.dispatch.calledWith(startGlobalCooldown())).toEqual(true);
    });
  });
});
