'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Room} from '../../app/components/room.jsx';

describe('<Room />', () => {
  let props, room;

  it('should render a roomName, description, and exits if there are no items', () => {
    props = {
      message: {
        room: {
          roomName: 'Test room',
          desc: 'Test room desc',
          exits: {
            up: {
              exit: 'Nexus',
              locked: false
            }
          },
          items: []
        }
      }
    };
    room = shallow(<Room {...props} />);
    expect(room.find('h3').text()).toEqual(props.message.room.roomName);
    expect(room.find('p').text()).toEqual(props.message.room.desc);
    expect(room.find('li').text()).toEqual('up');
    expect(room.find('ul').last().text()).toEqual('Exits: [ up ]');
  });

  it('should render a roomName, description, and locked exits if there are any', () => {
    props = {
      message: {
        room: {
          roomName: 'Test room',
          desc: 'Test room desc',
          exits: {
            up: {
              exit: 'Nexus',
              locked: true
            },
            east: {
              exit: 'Tester room B',
              locked: false
            }
          },
          items: []
        }
      }
    };
    room = shallow(<Room {...props} />);
    expect(room.find('ul').last().text()).toEqual('Exits: [ (up)east ]');
    expect(room.find('ul').last().children('li').at(0).text()).toEqual('(up)');
    expect(room.find('ul').last().children('li').at(1).text()).toEqual('east');
  });
});
