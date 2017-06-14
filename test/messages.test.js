'use strict';

import React from 'react';
import {mount} from 'enzyme';
import Messages from '../app/containers/messages.jsx';

describe('<Messages />', () => {
  let props, messageComponent;
  beforeEach(done => {
    props = {
      messages: []
    };
    done();
  });


  it('should not render any children', () => {
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('Room').length).toEqual(0);
    expect(messageComponent.find('Occupants').length).toEqual(0);
    expect(messageComponent.find('OnlineUsers').length).toEqual(0);
    expect(messageComponent.find('PlayerInput').length).toEqual(0);
    expect(messageComponent.find('Communication').length).toEqual(0);
    expect(messageComponent.find('Feedback').length).toEqual(0);
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
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('Room').length).toEqual(1);
    expect(messageComponent.find('Occupants').length).toEqual(0);
    expect(messageComponent.find('OnlineUsers').length).toEqual(0);
    expect(messageComponent.find('PlayerInput').length).toEqual(0);
    expect(messageComponent.find('Communication').length).toEqual(0);
    expect(messageComponent.find('Feedback').length).toEqual(0);
  });

  it('should render only an Occupants child with an occupants message', () => {
    props = {
      messages: [{
        occupants: ['tester']
      }]
    };
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('Occupants').length).toEqual(1);
    expect(messageComponent.find('Room').length).toEqual(0);
    expect(messageComponent.find('OnlineUsers').length).toEqual(0);
    expect(messageComponent.find('PlayerInput').length).toEqual(0);
    expect(messageComponent.find('Communication').length).toEqual(0);
    expect(messageComponent.find('Feedback').length).toEqual(0);
  });

  it('should render only an OnlineUsers child with an onlineUsers message', () => {
    props = {
      messages: [{
        onlineUsers: ['tester']
      }]
    };
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('OnlineUsers').length).toEqual(1);
    expect(messageComponent.find('Room').length).toEqual(0);
    expect(messageComponent.find('Occupants').length).toEqual(0);
    expect(messageComponent.find('PlayerInput').length).toEqual(0);
    expect(messageComponent.find('Communication').length).toEqual(0);
    expect(messageComponent.find('Feedback').length).toEqual(0);
  });

  it('should render only a PlayerInput child with a playerInput message', () => {
    props = {
      messages: [{
        playerInput: 'Say hello'
      }]
    };
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('PlayerInput').length).toEqual(1);
    expect(messageComponent.find('OnlineUsers').length).toEqual(0);
    expect(messageComponent.find('Room').length).toEqual(0);
    expect(messageComponent.find('Occupants').length).toEqual(0);
    expect(messageComponent.find('Communication').length).toEqual(0);
    expect(messageComponent.find('Feedback').length).toEqual(0);
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
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('Communication').length).toEqual(1);
    expect(messageComponent.find('PlayerInput').length).toEqual(0);
    expect(messageComponent.find('OnlineUsers').length).toEqual(0);
    expect(messageComponent.find('Room').length).toEqual(0);
    expect(messageComponent.find('Occupants').length).toEqual(0);
    expect(messageComponent.find('Feedback').length).toEqual(0);
  });

  it('should render only a Feedback child with a feedback message', () => {
    props = {
      messages: [{
        feedback: 'Wat'
      }]
    };
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('Feedback').length).toEqual(1);
    expect(messageComponent.find('Communication').length).toEqual(0);
    expect(messageComponent.find('PlayerInput').length).toEqual(0);
    expect(messageComponent.find('OnlineUsers').length).toEqual(0);
    expect(messageComponent.find('Room').length).toEqual(0);
    expect(messageComponent.find('Occupants').length).toEqual(0);
  });
});
