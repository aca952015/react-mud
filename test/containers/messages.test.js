'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import Messages from '../../app/containers/messages.jsx';

describe('<Messages />', () => {
  let props, messageComponent;
  beforeEach(done => {
    props = {
      messages: []
    };
    done();
  });

  it('should not render any children', () => {
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
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
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Room').length).toEqual(1);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
  });

  it('should render only an Occupants child with an occupants message', () => {
    props = {
      messages: [{
        occupants: ['tester']
      }]
    };
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Occupants').length).toEqual(1);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
  });

  it('should render only an OnlineUsers child with an onlineUsers message', () => {
    props = {
      messages: [{
        onlineUsers: ['tester']
      }]
    };
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('OnlineUsers').length).toEqual(1);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
  });

  it('should render only a PlayerInput child with a playerInput message', () => {
    props = {
      messages: [{
        playerInput: 'Say hello'
      }]
    };
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('PlayerInput').length).toEqual(1);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
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
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Communication').length).toEqual(1);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
  });

  it('should render only a Feedback child with a feedback message', () => {
    props = {
      messages: [{
        feedback: 'Wat'
      }]
    };
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Feedback').length).toEqual(1);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
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
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('HelpFile').length).toEqual(1);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
    expect(messageComponent.find('Inventory').node).toEqual(undefined);
  });

  it('should render only an Inventory child with an inventory message', () => {
    props = {
      messages: [{
        inventory: []
      }]
    };
    messageComponent = shallow(<Messages {...props} />);
    expect(messageComponent.find('Inventory').length).toEqual(1);
    expect(messageComponent.find('HelpFile').node).toEqual(undefined);
    expect(messageComponent.find('Feedback').node).toEqual(undefined);
    expect(messageComponent.find('Communication').node).toEqual(undefined);
    expect(messageComponent.find('PlayerInput').node).toEqual(undefined);
    expect(messageComponent.find('OnlineUsers').node).toEqual(undefined);
    expect(messageComponent.find('Room').node).toEqual(undefined);
    expect(messageComponent.find('Occupants').node).toEqual(undefined);
  });
});
