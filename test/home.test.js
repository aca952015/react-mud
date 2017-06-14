'use strict';

import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {updateInput} from '../app/actions/message-actions.js';
import {Home} from '../app/containers/home.jsx';

describe('<Home />', () => {
  let props = {
    dispatch: sinon.spy(),
    messages: [],
    commandIndex: 0,
    username: 'Tester',
    inventory: [],
  };
  let home = shallow(<Home {...props} />);

  it('has an initialState of justHitEnter being false', () => {
    expect(home.state().justHitEnter).toEqual(false);
  });

  it('handleChange should dispatch a correct updateInput', () => {
    home.instance().handleChange({target: {value: 'Test value'}});
    expect(props.dispatch.calledWith(updateInput('Test value', props.commandIndex))).toEqual(true);
  });
});
