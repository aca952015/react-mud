'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import newMob from '../../app/data/mobs.js';
import Messages from '../../app/containers/messages.jsx';

describe('<Messages />', () => {
  let props, messageComponent;
  beforeEach(done => {
    props = {
      messages: []
    };
    done();
  });

  const nodes = [
    'Room',
    'Occupants',
    'Containers',
    'Mobs',
    'CombatLog',
    'OnlineUsers',
    'PlayerInput',
    'Communication',
    'Feedback',
    'HelpFile',
    'Inventory',
    'Equipment',
    'PlayerDescription'
  ];

  it('should not render any children by default', () => {
    messageComponent = shallow(<Messages {...props} />);
    nodes.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a Room child with a room message', () => {
    props = {
      messages: [{
        room: {
          roomName: 'Test room',
          desc: 'This is the test room.',
          exits: {
            up: {
              exit: 'Nexus',
              locked: false
            }
          },
          items: []
        }
      }]
    };
    const undefineds = nodes.filter(node => node !== 'Room');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Room').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only an Occupants child with an occupants message', () => {
    props = {
      messages: [{
        occupants: ['tester']
      }]
    };
    const undefineds = nodes.filter(node => node !== 'Occupants');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Occupants').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only an OnlineUsers child with an onlineUsers message', () => {
    props = {
      messages: [{
        onlineUsers: ['tester']
      }]
    };
    const undefineds = nodes.filter(node => node !== 'OnlineUsers');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('OnlineUsers').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a PlayerInput child with a playerInput message', () => {
    props = {
      messages: [{
        playerInput: 'Say hello'
      }]
    };
    const undefineds = nodes.filter(node => node !== 'PlayerInput');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('PlayerInput').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));

  });

  it('should render only a Communication child with a commType message', () => {
    props = {
      messages: [{
        commType: ' says, ',
        from: 'tester',
        text: 'ayy'
      }],
      username: 'tester'
    };
    const undefineds = nodes.filter(node => node !== 'Communication');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Communication').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a Feedback child with a feedback message', () => {
    props = {
      messages: [{
        feedback: 'Wat'
      }]
    };
    const undefineds = nodes.filter(node => node !== 'Feedback');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Feedback').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a HelpFile child with a helpObj message', () => {
    props = {
      messages: [{
        helpObj: {
          title: 'Thing',
          text: 'Some stuff'
        }
      }]
    };
    const undefineds = nodes.filter(node => node !== 'HelpFile');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('HelpFile').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only an Inventory child with an inventory message', () => {
    props = {
      messages: [{
        inventory: []
      }]
    };
    const undefineds = nodes.filter(node => node !== 'Inventory');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Inventory').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a Mobs child with a mobs message', () => {
    props = {
      messages: [{
        mobs: [newMob('bat')]
      }]
    };
    const undefineds = nodes.filter(node => node !== 'Mobs');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Mobs').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a CombatLog child with a combatLog message', () => {
    props = {
      messages: [{
        combatLog: {
          from: 'You',
          interaction: ' do some stuff to ',
          target: 'a test target'
        }
      }]
    };
    const undefineds = nodes.filter(node => node !== 'CombatLog');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('CombatLog').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a Containers child with a containedItems message', () => {
    props = {
      messages: [{containedItems: []}]
    };
    const undefineds = nodes.filter(node => node !== 'Containers');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Containers').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only an Equipment child with an equipment message', () => {
    props = {
      messages: [{equipment: {}}]
    };
    const undefineds = nodes.filter(node => node !== 'Equipment');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Equipment').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });

  it('should render only a PlayerDescription child with a playerDescription message', () => {
    props = {
      messages: [{playerDescription: ['Paragraph1', 'Paragraph2']}]
    };
    const undefineds = nodes.filter(node => node !== 'PlayerDescription');

    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('PlayerDescription').length).toEqual(1);
    undefineds.forEach(node => expect(messageComponent.find(node).node).toEqual(undefined));
  });
});
