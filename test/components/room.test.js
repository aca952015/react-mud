'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Room} from '../../app/components/room.jsx';
import {itemData} from '../../app/data/items.js';

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

  it('should render locked exits if there are any', () => {
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

  it('should render items if there are any', () => {
    props = {
      message: {
        room: {
          roomName: 'Test room',
          desc: 'Test room desc',
          exits: {
            up: {
              exit: 'Blah',
              locked: false
            }
          },
          items: [itemData['health potion'], itemData['mana potion']]
        }
      }
    };
    room = shallow(<Room {...props} />);
    expect(room.find('ul').first().children('li').at(0).text()).toEqual(props.message.room.items[0].long);
    expect(room.find('ul').first().children('li').at(1).text()).toEqual(props.message.room.items[1].long);
  });

  it('should render (#) for items that have multiples in the room', () => {
    props = {
      message: {
        room: {
          roomName: 'Test room',
          desc: 'Test room desc',
          exits: {
            up: {
              exit: 'Blah',
              locked: false
            }
          },
          items: [itemData['health potion'], itemData['mana potion'], itemData['health potion']]
        }
      }
    };
    room = shallow(<Room {...props} />);
    expect(room.find('ul').first().children('li').at(0).text()).toEqual(`(2) ${props.message.room.items[0].long}`);
    expect(room.find('ul').first().children('li').at(1).text()).toEqual(props.message.room.items[1].long);
    expect(room.find('ul').first().children('li').at(2).node).toEqual(undefined);
  });
});
