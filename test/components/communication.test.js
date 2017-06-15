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
});
