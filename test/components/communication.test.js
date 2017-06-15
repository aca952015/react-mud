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
});
