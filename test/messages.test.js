'use strict';

import React from 'react';
import sinon from 'sinon';
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
  });

  it('should render an Occupants child with an occupants message', () => {
    props = {
      messages: [{
        occupants: ['tester']
      }]
    };
    messageComponent = mount(<Messages {...props} />);
    expect(messageComponent.find('Occupants').length).toEqual(1);
    expect(messageComponent.find('Room').length).toEqual(0);
  });
});
