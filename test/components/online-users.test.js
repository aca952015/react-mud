'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {OnlineUsers} from '../../app/components/online-users.jsx';

describe('<OnlineUsers />', () => {
  let props = {
    message: {
      onlineUsers: ['Guy1', 'Guy2', 'Guy3']
    }
  };
  let onlineUsers = shallow(<OnlineUsers {...props} />);

  it('should list all users online', () => {
    expect(onlineUsers.find('h3').text()).toEqual('Users online');
    expect(onlineUsers.find('p').text()).toEqual('--------------');
    expect(onlineUsers.find('li').at(0).text()).toEqual(props.message.onlineUsers[0]);
    expect(onlineUsers.find('li').at(1).text()).toEqual(props.message.onlineUsers[1]);
    expect(onlineUsers.find('li').at(2).text()).toEqual(props.message.onlineUsers[2]);
  });
});
