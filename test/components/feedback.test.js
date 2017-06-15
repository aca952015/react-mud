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
});
