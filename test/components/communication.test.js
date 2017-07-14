'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Communication} from '../../app/components/communication.jsx';

describe('<Communication />', () => {
  let props, comms;

  it('should always render a from and commType field as spans', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'tester',
        commType: ' says, '
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').childAt(0).text()).toEqual(props.message.from);
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
  });

  it('should render \'You say, "Message"\' to the user who enters "say <message>"', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'TestR',
        commType: ' say, ',
        text: 'Ayyy'
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').childAt(0).text()).toEqual('You');
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
    expect(comms.find('span span').at(2).text()).toEqual(`\"${props.message.text}\"`);
  });

  it('should render \'So-and-so says, "Message"\' to other users in the room when a user enters "say <message>"', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'tester',
        commType: ' says, ',
        text: 'Ayy'
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').childAt(0).text()).toEqual(props.message.from);
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
    expect(comms.find('span').at(2).text()).toEqual(`\"${props.message.text}\"`);
  });

  it('should render "The ghost of so-and-so says" if the from has The ghost of in it', () => {
    props = {
      username: 'Tester',
      message: {
        from: 'The ghost of TestR',
        commType: ' says, ',
        text: 'Ayy'
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').first().text()).toEqual('The ghost of TestR');
  });

  it('should render \'You whisper to <target>, "Message"\' when a user enters "whisper <target> <message>"', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'You ',
        target: 'SomeDude',
        commType: 'whisper to ',
        text: 'Dude.'
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').at(0).text()).toEqual(props.message.from);
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
    expect(comms.find('span.source').at(1).text()).toEqual(props.message.target);
    expect(comms.find('span.comm-type').at(1).text()).toEqual(', ');
    expect(comms.find('span').at(5).text()).toEqual(`\"${props.message.text}\"`);
  });

  it('should render \'So-and-so whispers to you, "Message"\' when a user enters "whisper <user> <message>"', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'tester',
        commType: ' whispers to ',
        target: 'you',
        text: 'Ayy'
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').at(0).text()).toEqual(props.message.from);
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
    expect(comms.find('span.source').at(1).text()).toEqual(props.message.target);
    expect(comms.find('span.comm-type').at(1).text()).toEqual(', ');
    expect(comms.find('span').at(5).text()).toEqual(`\"${props.message.text}\"`);
  });

  it('should render \'So-and-so whispers something to so-and-so\' when the user is a third party', () => {
    props = {
      username: 'ThirdDude',
      message: {
        from: 'TestR',
        target: 'tester',
        commType: ' whispers something to '
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').at(0).text()).toEqual(props.message.from);
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
    expect(comms.find('span.source').at(1).text()).toEqual(props.message.target);
    expect(comms.find('span.comm-type').at(1).text()).toEqual('.');
    expect(comms.find('span').at(5).text()).toEqual('');
  });

  it('should render \'You whisper to yourself, "Message"\' when the user enters "whisper <user> <message>"', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'You ',
        target: null,
        commType: ' whisper to yourself, ',
        text: 'Ayy'
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').at(0).text()).toEqual(props.message.from);
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
    expect(comms.find('span.source').at(1).node).toEqual(undefined);
    expect(comms.find('span.comm-type').at(1).text()).toEqual('"');
    expect(comms.find('span.comm-type').at(2).text()).toEqual('"');
    expect(comms.find('span').at(4).text()).toEqual(props.message.text);
  });

  it('should render \'So-and-so whisper something quietly.\' when the user is a third party to a self whisper', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'tester',
        commType: ' whispers something quietly.'
      }
    };
    comms = shallow(<Communication {...props} />);
    expect(comms.find('span.source').at(0).text()).toEqual(props.message.from);
    expect(comms.find('span.comm-type').first().text()).toEqual(props.message.commType);
    expect(comms.find('span.source').at(1).node).toEqual(undefined);
    expect(comms.find('span.comm-type').at(1).node).toEqual(undefined);
    expect(comms.find('span').at(4).node).toEqual(undefined);
  });
});
