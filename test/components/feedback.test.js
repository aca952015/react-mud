'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Feedback} from '../../app/components/feedback.jsx';

describe('<Feedback />', () => {
  let props, feedback;

  it('should render feedback with no other props', () => {
    props = {
      message: {
        feedback: 'Testing feedback'
      }
    };
    feedback = shallow(<Feedback {...props} />);
    expect(feedback.find('span').text()).toEqual(props.message.feedback);
  });

  it('should render the from field if the feedback involves another user', () => {
    props = {
      message: {
        from: 'tester',
        feedback: ' picks up something.'
      }
    };
    feedback = shallow(<Feedback {...props} />);
    expect(feedback.find('span').at(0).text()).toEqual(props.message.from);
    expect(feedback.find('span').at(1).text()).toEqual(props.message.feedback);
  });

  it('should render from, feedback, and interaction if all exist', () => {
    props = {
      message: {
        from: 'tester',
        interaction: ' does something ',
        feedback: 'with this feedback.'
      }
    };
    feedback = shallow(<Feedback {...props} />);
    expect(feedback.find('span').at(0).text()).toEqual(props.message.from);
    expect(feedback.find('span').at(1).text()).toEqual(props.message.interaction);
    expect(feedback.find('span').at(2).text()).toEqual(props.message.feedback);
  });

  it('should render from, interaction, and target if all exist', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'tester',
        interaction: ' looks at ',
        target: 'TestR',
      }
    };
    feedback = shallow(<Feedback {...props} />);
    expect(feedback.find('span').at(0).text()).toEqual(props.message.from);
    expect(feedback.find('span').at(1).text()).toEqual(props.message.interaction);
    expect(feedback.find('span').children('span').at(0).text()).toEqual('you');
    expect(feedback.find('span').children('span').at(1).text()).toEqual('.');
  });

  it('should render \'So-and-so <interaction> <target>\' if the user is a third party to an interaction', () => {
    props = {
      username: 'TestR',
      message: {
        from: 'Dude',
        target: 'tester',
        interaction: ' looks at '
      }
    };
    feedback = shallow(<Feedback {...props} />);
    expect(feedback.find('span').at(0).text()).toEqual(props.message.from);
    expect(feedback.find('span').at(1).text()).toEqual(props.message.interaction);
    expect(feedback.find('span').children('span').at(0).text()).toEqual(props.message.target);
    expect(feedback.find('span').children('span').at(1).text()).toEqual('.');
  });
});
