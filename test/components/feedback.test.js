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
});
